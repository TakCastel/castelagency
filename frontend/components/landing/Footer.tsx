"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

import { LinkedinIcon } from "@/components/ui/linkedin";
import { InstagramIcon } from "@/components/ui/instagram";
import { GithubIcon } from "@/components/ui/github";
import { TwitchIcon } from "@/components/ui/twitch";
import { BrandMark } from "@/components/BrandMark";
import { cn } from "@/lib/utils";

/** Marge droite pour ne pas chevaucher le bouton WhatsApp flottant. */
const WHATSAPP_OFFSET = "pr-20 sm:pr-24 md:pr-28";

/** Liens regroupés par catégorie pour une navigation footer plus lisible */
const footerNavGroups = [
  {
    title: "Découvrir",
    links: [
      { href: "/le-studio", label: "Le studio" },
      { href: "/mes-projets", label: "Projets" },
      { href: "/creations", label: "Créations" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Tous les services" },
      { href: "/developpeur-web-avignon", label: "Développeur web Avignon" },
      { href: "/mode-de-fonctionnement", label: "Méthode" },
    ],
  },
  {
    title: "Contact & légal",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/devis", label: "Devis" },
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
    ],
  },
] as const;

/** NAP (Name, Address, Phone) cohérent pour le SEO local — même que la fiche Google et le JSON-LD. */
const NAP_PHONE = "+33 6 08 43 20 59";
const NAP_PHONE_TEL = "tel:+33608432059";
const NAP_CITY = "Avignon";
const NAP_REGION = "Vaucluse";

const socialLinks = [
  { href: "https://www.linkedin.com/in/tarik-talhaoui-832769110/?locale=fr_FR", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://www.instagram.com/takcastel", label: "Instagram", Icon: InstagramIcon },
  { href: "https://github.com/TakCastel", label: "GitHub", Icon: GithubIcon },
  { href: "https://www.twitch.tv/siddoux", label: "Twitch", Icon: TwitchIcon },
] as const;

const variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (opts: { delay: number; reducedMotion: boolean }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: opts.reducedMotion ? 0 : opts.delay * 0.05,
      duration: opts.reducedMotion ? 0 : 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function FooterBlock({
  children,
  delay,
  reducedMotion,
  isInView,
}: {
  children: React.ReactNode;
  delay: number;
  reducedMotion: boolean;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      custom={{ delay, reducedMotion }}
    >
      {children}
    </motion.div>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <footer
      ref={ref}
      className={cn(
        "relative min-h-[380px] overflow-hidden md:min-h-[320px]",
        WHATSAPP_OFFSET
      )}
    >
      {/* Fond : même image que le hero, dégradé noir → transparent (haut → bas) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/assets/illustrations/hero-background.png"
          alt=""
          aria-hidden
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          quality={70}
          loading="lazy"
        />
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background: [
              "linear-gradient(to bottom",
              "hsl(var(--background)) 0%",
              "hsl(var(--background) / 0.99) 35%",
              "hsl(var(--background) / 0.97) 55%",
              "hsl(var(--background) / 0.92) 72%",
              "hsl(var(--background) / 0.82) 85%",
              "hsl(var(--background) / 0.88) 95%",
              "hsl(var(--background) / 0.75) 100%)",
            ].join(", "),
          }}
        />
      </div>

      <div className="container relative py-14 md:py-16">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
          {/* Colonne gauche : marque + NAP + réseaux */}
          <FooterBlock delay={0} reducedMotion={prefersReducedMotion} isInView={isInView}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
            >
              <BrandMark className="h-9 w-9 text-foreground" />
              <span className="text-lg font-semibold tracking-tight text-foreground">Studio Castel</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Agence web à Avignon. Sites, e‑commerce et applications sur mesure.
            </p>
            <address className="mt-4 not-italic text-sm text-muted-foreground">
              <span className="block font-medium text-foreground">{NAP_CITY}</span>
              <span className="block">{NAP_REGION}, France</span>
              <a
                href={NAP_PHONE_TEL}
                className="mt-1 block font-medium text-foreground hover:underline hover:underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              >
                {NAP_PHONE}
              </a>
            </address>
            <ul className="mt-6 flex gap-1" role="list">
              {socialLinks.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      "text-muted-foreground transition-all duration-200",
                      "hover:bg-primary/10 hover:text-primary hover:scale-105",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    )}
                  >
                    <Icon size={20} className="shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground/80">
              © {new Date().getFullYear()} · Tous droits réservés
            </p>
          </FooterBlock>

          {/* Colonnes droite : navigation par groupes */}
          {footerNavGroups.map((group, groupIndex) => (
            <FooterBlock
              key={group.title}
              delay={groupIndex + 1}
              reducedMotion={prefersReducedMotion}
              isInView={isInView}
            >
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5" role="list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-muted-foreground transition-colors",
                        "hover:text-foreground hover:underline hover:underline-offset-2",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterBlock>
          ))}
        </div>
      </div>
    </footer>
  );
}
