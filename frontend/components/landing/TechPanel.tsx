"use client";

import type { ComponentType } from "react";
import type { CSSProperties } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaReact, FaSass, FaFigma } from "react-icons/fa";
import { IoLogoCapacitor } from "react-icons/io5";
import { SiCss3, SiStrapi, SiPostman, SiTailwindcss } from "react-icons/si";
import { cn } from "@/lib/utils";

type IconProps = { className?: string; style?: CSSProperties };

/** Logos technos (SVG inline, même style que les pages services). style appliqué pour les couleurs de marque. */
const TechLogoHtml5 = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
  </svg>
);
const TechLogoCss3 = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
  </svg>
);
const TechLogoJavascript = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
  </svg>
);
const TechLogoVue = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M24 1.61h-9.94L12 5.16 9.94 1.61H0l12 20.78L24 1.61zM12 14.08L5.16 3.23h4.43L12 9.41l2.41-6.18h4.43L12 14.08z" />
  </svg>
);
const TechLogoNext = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
  </svg>
);
const TechLogoNuxt = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13.4642 19.8295h8.9218c.2834 0 .5618-.0723.8072-.2098a1.5899 1.5899 0 0 0 .5908-.5732 1.5293 1.5293 0 0 0 .216-.783 1.529 1.529 0 0 0-.2167-.7828L17.7916 7.4142a1.5904 1.5904 0 0 0-.5907-.573 1.6524 1.6524 0 0 0-.807-.2099c-.2833 0-.5616.0724-.807.2098a1.5904 1.5904 0 0 0-.5907.5731L13.4642 9.99l-2.9954-5.0366a1.5913 1.5913 0 0 0-.591-.573 1.6533 1.6533 0 0 0-.8071-.2098c-.2834 0-.5617.0723-.8072.2097a1.5913 1.5913 0 0 0-.591.573L.2168 17.4808A1.5292 1.5292 0 0 0 0 18.2635c-.0001.2749.0744.545.216.783a1.59 1.59 0 0 0 .5908.5732c.2454.1375.5238.2098.8072.2098h5.6003c2.219 0 3.8554-.9454 4.9813-2.7899l2.7337-4.5922L16.3935 9.99l4.3944 7.382h-5.8586ZM7.123 17.3694l-3.9083-.0009 5.8586-9.8421 2.9232 4.921-1.9572 3.2892c-.7478 1.1967-1.5972 1.6328-2.9163 1.6328z" />
  </svg>
);
const TechLogoDirectus = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.187 13.909a1.74 1.74 0 0 1-.286-.092.657.657 0 0 1-.203-.139c.056-.488 0-.912.047-1.392.184-1.862 1.355-1.272 2.406-1.577.655-.184 1.31-.562 1.475-1.336a13.528 13.528 0 0 0-2.397-2.204c-2.85-2.028-6.574-2.84-9.958-2.277a5.113 5.113 0 0 0 2.238 2.074s-.917 0-1.703-.587c-.23.092-.692.274-.913.384a5.094 5.094 0 0 0 6.63.37c-.01.017-.185.285-.397 1.4-.47 2.38-1.826 2.195-3.504 1.596-3.485-1.264-5.403-.093-7.145-2.49-.507.286-.82.82-.82 1.402 0 .599.331 1.106.81 1.383.262-.348.38-.446.836-.446-.706.4-.79.75-1.094 1.718-.368 1.171-.212 2.37-1.936 2.683-.913.046-.894.664-1.226 1.586-.415 1.199-.968 1.678-2.047 2.812.443.535.904.6 1.374.406.968-.406 1.715-1.66 2.415-2.471.784-.904 2.665-.517 4.085-1.402.977-.599 1.457-1.41.811-2.784a2.72 2.72 0 0 1 .701 1.66c1.641-.213 3.836 1.788 5.836 2.12a3.574 3.574 0 0 1-.488-.82c-.23-.554-.304-1.06-.258-1.503.184 1.097 1.29 2.507 3.07 2.637.452.036.95-.019 1.466-.176.618-.184 1.19-.424 1.872-.295.507.093.977.35 1.272.784.443.645 1.41.784 1.844-.009-.977-2.554-3.67-2.72-4.813-3.015z" />
  </svg>
);
const TechLogoWordPress = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0" />
  </svg>
);

export type TechItem = {
  id: string;
  label: string;
  global: string;
  evolution: string;
  Icon: ComponentType<IconProps>;
  color: string;
};

const defaultTechs: TechItem[] = [
  { id: "html", label: "HTML", global: "Structure et sémantique des pages web. Les bonnes balises améliorent l'accessibilité et le référencement.", evolution: "Du HTML « à l'ancienne » aux balises sémantiques (HTML5) et à une attention constante à l'accessibilité et au SEO on-page.", Icon: TechLogoHtml5, color: "#E34F26" },
  { id: "css", label: "CSS", global: "Langage de mise en forme : couleurs, mise en page, responsive, animations. Évolue avec les spécifications (flexbox, grid, variables).", evolution: "CSS classique puis BEM pour structurer les styles. Aujourd'hui surtout Tailwind pour aller vite tout en gardant la main sur le design.", Icon: TechLogoCss3, color: "#1572B6" },
  { id: "javascript", label: "JavaScript", global: "Langage du web côté navigateur (et serveur avec Node). Interactivité, appels API, DOM, interfaces riches.", evolution: "jQuery puis Vue et React pour des applications structurées. Aujourd'hui surtout Nuxt et Next pour le SSR et l'écosystème moderne.", Icon: TechLogoJavascript, color: "#F7DF1E" },
  { id: "react", label: "React", global: "Bibliothèque UI en composants, écosystème riche (hooks, état, rendu serveur). Très répandue pour les apps web et mobiles.", evolution: "Après Vue, adoption de React pour des projets orientés écosystème et performance, souvent couplé à Next.js pour le SSR.", Icon: FaReact, color: "#61DAFB" },
  { id: "vue", label: "Vue", global: "Framework progressif : du petit script à l'application complète. Réactivité, single-file components, Vue Router, Pinia.", evolution: "Passage naturel après jQuery pour des interfaces réactives, puis Nuxt pour le SSR et les sites orientés contenu.", Icon: TechLogoVue, color: "#4FC08D" },
  { id: "next", label: "Next.js", global: "Framework React avec SSR, SSG, routing fichier, API routes. Idéal pour des sites performants et bien référencés.", evolution: "Devenu mon choix principal pour les sites et apps React : SEO, performances et DX au top pour des livrables solides.", Icon: TechLogoNext, color: "currentColor" },
  { id: "nuxt", label: "Nuxt.js", global: "Framework Vue avec SSR, routing automatique, modules. Très adapté aux sites vitrines et apps Vue avec contenu dynamique.", evolution: "Utilisé pour des sites vitrines et des apps Vue qui nécessitent du SSR et une bonne intégration CMS ou API.", Icon: TechLogoNuxt, color: "#00DC82" },
  { id: "tailwind", label: "Tailwind", global: "Framework CSS utility-first : classes atomiques, design system cohérent et personnalisable.", evolution: "Après BEM et préprocesseurs, passage à Tailwind pour gagner en rapidité et cohérence, souvent avec shadcn/ui pour des composants accessibles.", Icon: SiTailwindcss, color: "#06B6D4" },
  { id: "sass", label: "SASS", global: "Préprocesseur CSS : variables, mixins, imbrication. Utile pour des codebases CSS plus structurées et maintenables.", evolution: "Beaucoup utilisé avant Tailwind sur des projets avec design systems dédiés ; je l'utilise encore quand le projet le demande.", Icon: FaSass, color: "#CC6699" },
  { id: "directus", label: "Directus", global: "Headless CMS open source : base de données, API auto-générée, back-office pour les contenus. Idéal pour découpler contenu et front.", evolution: "Mon CMS headless de prédilection pour les sites et apps sur mesure : souplesse, API propre et déploiement maîtrisé.", Icon: TechLogoDirectus, color: "#6644FF" },
  { id: "strapi", label: "Strapi", global: "CMS headless open source, orienté API et personnalisation des modèles. Très adapté aux apps et portails avec back-office sur mesure.", evolution: "Utilisé pour des projets qui nécessitent un back-office riche et des API sur mesure, en complément de React ou Vue.", Icon: SiStrapi, color: "#2F2E8B" },
  { id: "wordpress", label: "WordPress", global: "CMS historique : back-office familier, écosystème de thèmes et plugins. Très adapté aux sites vitrines et blogs avec mise à jour par le client.", evolution: "Pour des clients qui veulent garder la main sur les contenus sans formation lourde ; je privilégie maintenant le headless ou Next/Nuxt quand le projet le permet.", Icon: TechLogoWordPress, color: "#21759B" },
  { id: "capacitor", label: "Capacitor", global: "Couche native pour embarquer une app web (React, Vue) sur iOS et Android. Un seul codebase pour web et stores.", evolution: "Utilisé pour livrer des apps mobiles à partir d'une base web existante, sans tout réécrire en natif.", Icon: IoLogoCapacitor, color: "#119EFF" },
  { id: "figma", label: "Figma", global: "Outil de design et prototypage collaboratif : maquettes, design systems, prototypes interactifs. Référence pour l'UX/UI.", evolution: "Outil principal pour la conception et la collaboration avec les clients ; j'y conçois les interfaces avant de passer au code.", Icon: FaFigma, color: "#F24E1E" },
  { id: "postman", label: "Postman", global: "Outil pour tester et documenter les API. Collections, environnements, intégration dans le workflow de développement.", evolution: "Utilisé tout au long des projets pour concevoir, tester et valider les endpoints avec l'équipe ou les clients.", Icon: SiPostman, color: "#FF6C37" },
];

type TechPanelProps = {
  techs?: TechItem[];
  className?: string;
};

export function TechPanel({ techs = defaultTechs, className }: TechPanelProps) {
  const [selectedId, setSelectedId] = useState<string>(techs[0]?.id ?? "");
  const selected = techs.find((t) => t.id === selectedId) ?? techs[0];

  return (
    <div className={cn("flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10", className)}>
      {/* Tous les symboles ensemble, cliquables */}
      <div
        className="flex flex-wrap gap-3 lg:basis-1/2 lg:gap-4"
        role="tablist"
        aria-label="Technologies"
      >
        {techs.map((t) => {
          const Icon = t.Icon;
          const isSelected = selectedId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls="tech-panel"
              id={`tab-${t.id}`}
              onClick={() => setSelectedId(t.id)}
              title={t.label}
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border transition-colors md:h-16 md:w-16 [&_svg]:shrink-0",
                isSelected
                  ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                  : "border-border bg-muted/50 hover:border-muted-foreground/30 hover:bg-muted/80"
              )}
            >
              <Icon
                className="h-7 w-7 md:h-8 md:w-8"
                style={{ color: t.color, fill: t.color }}
              />
            </button>
          );
        })}
      </div>

      {/* Volet texte : change au clic */}
      <div
        id="tech-panel"
        role="tabpanel"
        aria-labelledby={selected ? `tab-${selected.id}` : undefined}
        className="min-h-[140px] flex-1 rounded-xl border border-border bg-muted/20 p-5 lg:basis-1/2 lg:p-6"
      >
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-titre-petit font-semibold tracking-tight">
                {selected.label}
              </h3>
              <div>
                <p className="text-small font-medium text-muted-foreground">
                  En quelques mots
                </p>
                <p className="mt-1 text-paragraphe text-foreground text-pretty">
                  {selected.global}
                </p>
              </div>
              <div>
                <p className="text-small font-medium text-muted-foreground">
                  Mon parcours avec
                </p>
                <p className="mt-1 text-paragraphe text-muted-foreground text-pretty">
                  {selected.evolution}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
