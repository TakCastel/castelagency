"use client";

import Link from "next/link";
import { ArrowRight, Bot, Globe, LayoutGrid, Search, ShoppingBag, Sparkles } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollIllustration } from "@/components/landing/ScrollIllustration";
import { SectionIntro } from "@/components/landing/SectionIntro";

const features = [
  { icon: Globe, title: "Création / refonte de site vitrine", desc: "Pages claires, copy orientée conversion, SEO on‑page.", href: "/services/site-vitrine" },
  { icon: ShoppingBag, title: "E‑commerce", desc: "Catalogue, paiement, tracking, pages optimisées.", href: "/services/ecommerce" },
  { icon: LayoutGrid, title: "Applications & sur‑mesure", desc: "Portails, outils internes, dashboards.", href: "/services/applications-sur-mesure" },
  { icon: Sparkles, title: "UX/UI & branding", desc: "Wireframes, UI kit, identité, médias (photo/vidéo).", href: "/services/ux-ui-branding" },
  { icon: Search, title: "SEO & acquisition", desc: "SEO technique, contenu, maillage, analytics.", href: "/services/seo-acquisition" },
  { icon: Bot, title: "Process IA", desc: "Audit, plan éditorial, briefs, automatisations.", href: "/services/process-ia" }
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.45, ease: "easeOut" as const }
  })
};

export function FeatureGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileIlluRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="features" className="container overflow-visible py-16 md:py-20">
      {/* Desktop : grille stricte 1/3 (image) + 2/3 (contenu) */}
      <div className="overflow-visible lg:grid lg:grid-cols-3 lg:gap-10 lg:items-start">
        {/* Colonne illustration desktop : exactement 1/3 — overflow-visible pour ne pas rogner l'image lors de l'animation */}
        <div className="hidden overflow-visible pt-8 lg:block lg:min-h-[420px]">
          <ScrollIllustration scrollTargetRef={sectionRef} />
        </div>

        {/* Colonne contenu : exactement 2/3 — overflow-visible pour ne pas tronquer l'animation des cartes */}
        <div ref={contentRef} className="min-w-0 overflow-visible lg:col-span-2">
          <SectionIntro
            label="Ce que je fais"
            title="Création de sites internet à Avignon. Je m'occupe de tout."
            description="Je couvre l'essentiel : stratégie, design, développement, contenu et SEO. De l'idée à la mise en ligne, je gère."
            isInView={isInView}
            textAlignClassName="text-center lg:text-left"
          />

          {/* Illustration mobile/tablette : entre titre et cards, centrée */}
          <div
            ref={mobileIlluRef}
            className="flex min-h-[280px] items-center justify-center py-8 md:min-h-[320px] lg:hidden"
          >
            <ScrollIllustration scrollTargetRef={mobileIlluRef} variant="mobile" />
          </div>

          <p className="mt-6 text-center lg:text-left">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-small font-medium text-primary hover:underline"
            >
              Voir tous les services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
          <div className="mt-10 grid gap-4 overflow-visible md:grid-cols-2 lg:items-stretch">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="h-full"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={i}
                variants={cardVariants}
              >
                <Card className="flex h-full flex-col bg-card">
                  <CardHeader className="pb-3">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col pt-0">
                    <p className="text-small text-muted-foreground">{f.desc}</p>
                    <Link
                      href={f.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-small font-medium text-primary hover:underline"
                    >
                      En savoir plus
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
