"use client";

import { AiOutlineOpenAI } from "react-icons/ai";
import { FaImdb } from "react-icons/fa";
import { RiGeminiFill } from "react-icons/ri";
import { Code2 } from "lucide-react";
import { IoLogoCapacitor, IoLogoPwa } from "react-icons/io5";
import {
  SiCss3,
  SiDirectus,
  SiDiscord,
  SiFirebase,
  SiGhost,
  SiHtml5,
  SiJavascript,
  SiNetlify,
  SiNextdotjs,
  SiPagespeedinsights,
  SiPatreon,
  SiReact,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const iconByTech: Record<string, React.ComponentType<{ className?: string }>> = {
  "Next.js": SiNextdotjs,
  "Next.js / React": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  Directus: SiDirectus,
  Patreon: SiPatreon,
  Ghost: SiGhost,
  Discord: SiDiscord,
  PWA: IoLogoPwa,
  Capacitor: IoLogoCapacitor,
  OpenAI: AiOutlineOpenAI,
  Gemini: RiGeminiFill,
  Firebase: SiFirebase,
  IMDb: FaImdb,
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  "HTML/CSS/JS": SiHtml5,
  "PageSpeed Insights API": SiPagespeedinsights,
  "Pagespeed Insights API": SiPagespeedinsights,
};

const FallbackIcon = Code2;

export function TechIcons({ technologies }: { technologies: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-3" role="list" aria-label="Technologies utilisées">
      {technologies.map((name) => {
        const Icon = iconByTech[name] ?? FallbackIcon;
        return (
          <span
            key={name}
            className="inline-flex items-center justify-center rounded-lg border border-border/80 bg-muted/50 p-3 transition-colors hover:bg-muted"
            title={name}
            role="listitem"
          >
            <Icon className="h-6 w-6 text-foreground/80" aria-hidden />
          </span>
        );
      })}
    </div>
  );
}
