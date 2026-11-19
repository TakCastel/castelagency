"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ExternalLink,
  Maximize2,
  Music2,
  Pause,
  PenLine,
  Play,
  Search,
  Share2,
} from "lucide-react";

import type { BookItem } from "@/data/books";
import {
  creationPath,
  creationSections,
  sectionByPath,
} from "@/data/creations";
import { DRAWING_BLUR_DATA_URL, type DrawingItem } from "@/data/drawings";
import { musicTrackPath, sunoSongUrl, type MusicTrack } from "@/data/music";
import { clean } from "../text";
import { DrawingLightbox } from "./DrawingLightbox";
import { Equalizer } from "./Equalizer";
import { useMusic } from "./MusicPlayerProvider";
import { shareLink } from "@/lib/share";
import { TrackStats } from "./TrackStats";
import { formatTime } from "./useMusicPlayer";

type Kind = "music" | "drawing" | "book";
type Item =
  | { kind: "music"; key: string; track: MusicTrack }
  | { kind: "drawing"; key: string; drawing: DrawingItem }
  | { kind: "book"; key: string; book: BookItem };

const PAGE = 36;

/** Libellé et icône par type. */
const KINDS: Record<
  Kind,
  { label: string; plural: string; icon: typeof Music2 }
> = {
  music: { label: "Musique", plural: "Musiques", icon: Music2 },
  drawing: { label: "Dessin", plural: "Dessins", icon: PenLine },
  book: { label: "Écrit", plural: "Écrits", icon: BookOpen },
};

/**
 * Étiquette de type (vue « Tout » seulement) : même style pour tous, seuls l'icône et le libellé changent.
 * En bas à gauche : en haut, elle masquerait le titre imprimé sur les couvertures de livres.
 */
function Badge({ kind }: { kind: Kind }) {
  const { label, icon: Icon } = KINDS[kind];
  return (
    <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-castel-ink/80 px-2.5 py-1 text-xs font-semibold text-white shadow-md ring-1 ring-white/20 backdrop-blur">
      <Icon className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
      {label}
    </span>
  );
}

/** Nombre de colonnes du masonry (2 / 3 / 4). Côté serveur : 3, corrigé dès l'hydratation. */
function useColumns() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => (window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 3 : 2),
    () => 3,
  );
}

/** Hauteur estimée d'une carte pour une colonne de largeur 1 (image + légende). */
function estimateHeight(item: Item) {
  if (item.kind === "music") return 1 + 0.3;
  if (item.kind === "book") return 1.5 + 0.35;
  return item.drawing.height / item.drawing.width + 0.25;
}

/** Musiques triées par un mix likes + écoutes ; dessins et écrits (du plus récent au plus ancien) glissés toutes les 3 cartes. */
function weave(
  tracks: MusicTrack[],
  drawings: DrawingItem[],
  books: BookItem[],
): Item[] {
  const music: Item[] = tracks.map((track) => ({
    kind: "music",
    key: `m-${track.id}`,
    track,
  }));
  const others: (Item & { year: number })[] = [
    ...drawings.map((drawing) => ({
      kind: "drawing" as const,
      key: `d-${drawing.id}`,
      drawing,
      year: drawing.date ?? 0,
    })),
    ...books.map((book) => ({
      kind: "book" as const,
      key: `b-${book.id}`,
      book,
      year: book.year ?? 0,
    })),
  ].sort((a, b) => b.year - a.year);
  const out: Item[] = [];
  let m = 0;
  let o = 0;
  while (m < music.length || o < others.length) {
    if ((out.length % 3 === 1 && o < others.length) || m >= music.length)
      out.push(others[o++]);
    else out.push(music[m++]);
  }
  return out;
}

const matches = (item: Item, q: string) => {
  if (item.kind === "music")
    return `${item.track.title} ${item.track.tags}`.toLowerCase().includes(q);
  if (item.kind === "drawing")
    return `${item.drawing.title ?? ""} ${item.drawing.alt}`
      .toLowerCase()
      .includes(q);
  return `${item.book.title} ${item.book.description}`
    .toLowerCase()
    .includes(q);
};

const cardCls =
  "group relative block w-full overflow-hidden rounded-chip bg-castel-surface text-left ring-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

/** Gros bouton rond au centre de l'image, visible au survol (ou en permanence pour le morceau en cours). */
function Overlay({
  visible,
  children,
}: {
  visible: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`absolute inset-0 flex items-center justify-center bg-castel-ink/35 transition-opacity ${visible ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}
    >
      {children}
    </span>
  );
}

export function CreationsFeed({
  tracks,
  drawings,
  books,
}: {
  tracks: MusicTrack[];
  drawings: DrawingItem[];
  books: BookItem[];
}) {
  // Le filtre vient de l'URL (/creations/musiques…) : chaque vue est une vraie page, partageable et indexée.
  const pathname = usePathname();
  const section = sectionByPath(pathname);
  const filter = section.filter;
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(PAGE);
  const [openDrawing, setOpenDrawing] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  // Tri des musiques, comme sur Suno : « Top » (écoutes + likes, ordre de music.json) ou « Nouveautés ».
  const [musicSort, setMusicSort] = useState<"top" | "new">("top");
  const columns = useColumns();

  useEffect(() => setMounted(true), []);

  const sortedTracks = useMemo(
    () =>
      musicSort === "new"
        ? [...tracks].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        : tracks,
    [tracks, musicSort],
  );
  const all = useMemo(
    () => weave(sortedTracks, drawings, books),
    [sortedTracks, drawings, books],
  );
  const counts = useMemo(
    () => ({
      all: all.length,
      music: tracks.length,
      drawing: drawings.length,
      book: books.length,
    }),
    [all.length, tracks.length, drawings.length, books.length],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter(
      (it) =>
        (filter === "all" || it.kind === filter) && (!q || matches(it, q)),
    );
  }, [all, filter, query]);
  const shown = filtered.slice(0, visible);

  // File de lecture = musiques de la liste filtrée ; flèches de la modale = dessins de la liste filtrée.
  const queueTracks = useMemo(
    () => filtered.flatMap((it) => (it.kind === "music" ? [it.track] : [])),
    [filtered],
  );
  const shownDrawings = useMemo(
    () => filtered.flatMap((it) => (it.kind === "drawing" ? [it.drawing] : [])),
    [filtered],
  );
  const { player } = useMusic();
  const { cue, currentId, setQueue } = player;
  useEffect(() => setQueue(queueTracks), [queueTracks, setQueue]);

  // Lien partagé d'un morceau (/creations/musiques/<id>) : on le charge dans la barre (la page affiche sa fiche).
  // Pas de lecture automatique (bloquée par les navigateurs) : un clic sur Lecture suffit.
  // Si une musique est déjà chargée (lecteur global), on n'y touche pas.
  const sharedId =
    pathname.match(/^\/creations\/musiques\/([^/]+)/)?.[1] ?? null;
  const currentIdRef = useRef(currentId);
  currentIdRef.current = currentId;
  useEffect(() => {
    if (!sharedId || currentIdRef.current) return;
    const t = tracks.find((x) => x.id === sharedId);
    if (!t?.audio) return;
    cue(t);
  }, [sharedId, tracks, cue]);

  // Dans la vue Musiques, l'URL suit le morceau en cours (comme YouTube Music) : on peut la copier telle quelle.
  // replaceState : pas d'entrée d'historique par morceau. Hors de cette vue, on ne touche pas à l'URL
  // (elle ferait basculer le filtre). Lecteur fermé : retour à /creations/musiques.
  const inMusic = filter === "music";
  // On ne réagit qu'aux changements de morceau : en arrivant sur la page (lecteur global déjà lancé
  // ailleurs, ou fiche d'un autre morceau), l'URL reste celle qu'on a ouverte.
  const prevId = useRef(currentId);
  useEffect(() => {
    if (prevId.current === currentId) return;
    const closed = !!prevId.current && !currentId;
    prevId.current = currentId;
    if (!inMusic) return;
    const target = currentId
      ? musicTrackPath(currentId)
      : closed
        ? "/creations/musiques"
        : null;
    if (target && window.location.pathname !== target)
      window.history.replaceState(window.history.state, "", target);
  }, [currentId, inMusic]);

  // Répartition dans la colonne la plus courte : les cartes déjà affichées ne bougent pas quand on en charge d'autres.
  const cols = useMemo(() => {
    const out: Item[][] = Array.from({ length: columns }, () => []);
    const heights = new Array(columns).fill(0);
    for (const it of shown) {
      const c = heights.indexOf(Math.min(...heights));
      out[c].push(it);
      heights[c] += estimateHeight(it);
    }
    return out;
  }, [shown, columns]);

  const closeDrawing = useCallback(() => setOpenDrawing(null), []);
  const stepDrawing = useCallback(
    (d: number) =>
      setOpenDrawing((i) =>
        i === null ? i : (i + d + shownDrawings.length) % shownDrawings.length,
      ),
    [shownDrawings.length],
  );

  const reset = () => setVisible(PAGE);
  useEffect(() => setVisible(PAGE), [filter]);

  // Partage natif sur mobile, sinon copie du lien de la vue en cours.
  const share = async () => {
    const url = window.location.origin + creationPath(section);
    if (
      (await shareLink(url, `${section.heading} | Studio Castel`)) === "copied"
    ) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderItem = (it: Item) => {
    if (it.kind === "music") {
      const t = it.track;
      const active = t.id === player.currentId;
      const isPlaying = active && player.playing;
      const media = (
        <>
          <span className="relative block aspect-square overflow-hidden">
            <Image
              src={t.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw"
              quality={70}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {filter === "all" && <Badge kind="music" />}
            <Overlay visible={active}>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-castel-red text-castel-ink shadow-lg">
                {!t.audio ? (
                  <ExternalLink className="h-6 w-6" />
                ) : isPlaying ? (
                  <Pause className="h-6 w-6" fill="currentColor" />
                ) : (
                  <Play className="ml-1 h-6 w-6" fill="currentColor" />
                )}
              </span>
            </Overlay>
          </span>
          <span className="block px-3.5 pb-3.5 pt-3">
            <span className="flex items-center gap-2">
              {active && <Equalizer playing={isPlaying} />}
              <span
                className={`truncate font-display font-semibold ${active ? "text-castel-red" : "text-white"}`}
              >
                {t.title}
              </span>
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-sm text-white/55">
              <Play
                className="h-3 w-3 shrink-0"
                fill="currentColor"
                aria-hidden="true"
              />
              <span className="tabular-nums">{formatTime(t.duration)}</span>
              {t.tags && <span className="truncate">· {t.tags}</span>}
            </span>
            <TrackStats track={t} className="mt-1" />
          </span>
        </>
      );
      const cls = `${cardCls} ${active ? "ring-castel-red" : "ring-transparent hover:ring-white/25"}`;
      return t.audio ? (
        <button
          type="button"
          onClick={() => player.playTrack(t)}
          aria-label={`Musique : ${isPlaying ? "mettre en pause" : "écouter"} ${t.title}`}
          aria-pressed={active}
          className={cls}
        >
          {media}
        </button>
      ) : (
        <a
          href={sunoSongUrl(t.id)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Musique : écouter ${t.title} sur Suno`}
          className={cls}
        >
          {media}
        </a>
      );
    }

    if (it.kind === "drawing") {
      const d = it.drawing;
      return (
        <button
          type="button"
          onClick={() =>
            setOpenDrawing(shownDrawings.findIndex((x) => x.id === d.id))
          }
          aria-label={`Dessin : agrandir ${d.title ?? d.alt}`}
          className={`${cardCls} ring-transparent hover:ring-white/25`}
        >
          <span className="relative block bg-white">
            <Image
              src={d.src}
              alt={d.alt}
              width={d.width}
              height={d.height}
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw"
              placeholder="blur"
              blurDataURL={DRAWING_BLUR_DATA_URL}
              className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
            />
            {filter === "all" && <Badge kind="drawing" />}
            <Overlay visible={false}>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-castel-ink shadow-lg">
                <Maximize2 className="h-6 w-6" />
              </span>
            </Overlay>
          </span>
          <span className="flex items-baseline justify-between gap-2 px-3.5 pb-3.5 pt-3">
            <span className="truncate font-display font-semibold text-white">
              {d.title ?? "Sans titre"}
            </span>
            {d.date && (
              <span className="shrink-0 text-sm text-white/55">{d.date}</span>
            )}
          </span>
        </button>
      );
    }

    const b = it.book;
    const internal = Boolean(b.internalPath);
    const inner = (
      <>
        <span className="relative block aspect-[2/3] overflow-hidden bg-castel-ink">
          <Image
            src={b.image}
            alt={b.imageAlt}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {filter === "all" && <Badge kind="book" />}
        </span>
        <span className="block px-3.5 pb-3.5 pt-3">
          <span className="block font-display font-semibold leading-snug text-white">
            {clean(b.title)}
          </span>
          <span className="mt-0.5 block text-sm text-white/55">
            {[b.source, b.year].filter(Boolean).join(" · ")}
          </span>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-castel-ink transition-colors group-hover:bg-castel-red">
            Lire
            {internal ? (
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            )}
          </span>
        </span>
      </>
    );
    const cls = `${cardCls} ring-transparent hover:ring-white/25`;
    return internal ? (
      <Link
        href={b.internalPath!}
        aria-label={`Écrit : lire ${clean(b.title)}`}
        className={cls}
      >
        {inner}
      </Link>
    ) : (
      <a
        href={b.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Écrit : lire ${clean(b.title)} (nouvel onglet)`}
        className={cls}
      >
        {inner}
      </a>
    );
  };

  const currentDrawing =
    openDrawing !== null ? shownDrawings[openDrawing] : null;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Filtrer par type" className="flex flex-wrap gap-2">
          {creationSections.map((s) => {
            const k = s.filter;
            const active = filter === k;
            const Icon = k === "all" ? null : KINDS[k].icon;
            return (
              <Link
                key={k}
                href={creationPath(s)}
                scroll={false}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-medium transition-colors ${active ? "border-white bg-white text-castel-ink" : "border-white/20 text-white/80 hover:border-white hover:text-white"}`}
              >
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                {s.label}
                <span
                  className={`text-sm tabular-nums ${active ? "text-castel-ink/60" : "text-white/45"}`}
                >
                  {counts[k]}
                </span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={share}
            aria-live="polite"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {copied ? (
              <Check className="h-4 w-4 text-castel-red" aria-hidden="true" />
            ) : (
              <Share2 className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? "Lien copié" : "Partager"}
          </button>
        </nav>
        <label className="relative block w-full lg:w-72">
          <span className="sr-only">Chercher</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              reset();
            }}
            placeholder="Titre, genre…"
            className="h-11 w-full rounded-full border border-white/15 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
          />
        </label>
      </div>

      {filter === "music" && (
        <div
          role="radiogroup"
          aria-label="Trier les musiques"
          className="mt-4 inline-flex rounded-full border border-white/15 p-1"
        >
          {(
            [
              ["top", "Top"],
              ["new", "Nouveautés"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={musicSort === k}
              onClick={() => {
                setMusicSort(k);
                reset();
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${musicSort === k ? "bg-white text-castel-ink" : "text-white/70 hover:text-white"}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-10 text-white/60">Rien ne correspond à « {query} ».</p>
      ) : (
        <div className="mt-8 flex items-start gap-3 sm:gap-4 lg:gap-5">
          {cols.map((col, i) => (
            <ul
              key={i}
              className="flex min-w-0 flex-1 flex-col gap-3 p-0 sm:gap-4 lg:gap-5"
            >
              {col.map((it) => (
                <li key={it.key} className="list-none">
                  {renderItem(it)}
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="rounded-full border border-white/20 px-6 py-3 font-display font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-castel-ink"
          >
            Voir plus ({filtered.length - visible} restants)
          </button>
        </div>
      )}
      {mounted && currentDrawing
        ? createPortal(
            <DrawingLightbox
              drawing={currentDrawing}
              hasSiblings={shownDrawings.length > 1}
              onClose={closeDrawing}
              onStep={stepDrawing}
            />,
            document.body,
          )
        : null}
    </div>
  );
}
