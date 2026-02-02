"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { SectionIntro } from "@/components/landing/SectionIntro";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/** Parse "DD/MM/YYYY" en timestamp pour le tri */
function parseDate(dateStr: string): number {
  const [d, m, y] = dateStr.split("/").map(Number);
  return new Date(y, m - 1, d).getTime();
}

const testimonialsRaw = [
  {
    initials: "AB",
    name: "Arnaud Ban",
    role: "Vidéaste Freelance",
    date: "01/10/2025",
    quote:
      "Grâce à Tarik j'ai enfin une belle vitrine pour mettre mes travaux en avant. La création de mon site internet s'est faite de manière fluide, rapide et dans la bonne ambiance. C'est un développeur efficace, à l'écoute des demandes de ses clients et je suis très satisfait du travail qu'il a accompli pour moi."
  },
  {
    initials: "BT",
    name: "Brice Théâte",
    role: "Scénariste",
    subtitle: "Indépendant",
    date: "30/09/2025",
    quote:
      "Je ne peux que recommander Tarik pour la qualité de son travail qui allie professionnalisme, écoute et rapidité d'exécution. Le tout avec un réel sens du contact et beaucoup de bienveillance."
  },
  {
    initials: "AG",
    name: "Anthony Gourraud",
    role: "Tech Lead Mt Pelerin & ibani",
    date: "27/08/2021",
    quote:
      "Alors que c'était son premier emploi en tant que développeur, Tarik a su monter rapidement en compétence et fournir un travail de qualité. Passionné par le développement d'interfaces web - notamment en Vue avec le framework Nuxt -, Tarik est aussi très ouvert d'esprit et sait s'adapter selon les différents contextes de projets."
  },
  {
    initials: "MG",
    name: "Mathis Grassot",
    role: "Data Analyst | Capgemini",
    date: "15/12/2019",
    quote:
      "Développeur Front-End avec qui j'ai eu le privilège de collaborer chez Mediameeting, Tarik a une forte capacité à sortir de son périmètre défini, tout en délivrant de solides fondamentaux sur ses projets. Toujours de bons conseils, Tarik met à la portée d'un public non expert ses connaissances sur des sujets techniques et cela toujours avec une bonne humeur communicative."
  }
];

const testimonials = [...testimonialsRaw].sort(
  (a, b) => parseDate(b.date) - parseDate(a.date)
);

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="avis" className="container py-16 md:py-20">
      <div ref={contentRef} className="mx-auto max-w-3xl text-center">
        <SectionIntro
          label="Témoignages"
          title="Ce qu'ils disent de moi"
          description="Retours de clients et collaborateurs avec qui j'ai travaillé."
          isInView={isInView}
          textAlignClassName="text-center"
        />
      </div>

      <div className="relative mx-auto mt-10 max-w-xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop={false}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          pagination={{
            el: ".testimonials-pagination",
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-muted-foreground/30 !w-2 !h-2",
            bulletActiveClass: "!bg-primary !w-6 !rounded-full"
          }}
          navigation={{
            prevEl: ".testimonials-swiper-prev",
            nextEl: ".testimonials-swiper-next"
          }}
          className="!overflow-visible"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.initials} className="!h-full">
              <article
                className={cn(
                  "relative flex min-h-0 flex-col overflow-hidden rounded-lg border bg-card/80 p-4 shadow-sm backdrop-blur-sm",
                  "md:p-5"
                )}
              >
                {/* Sphères grises pour le relief (style bloc CTA) */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-[-80px] top-[-80px] h-[200px] w-[200px] rounded-full bg-gradient-to-br from-muted-foreground/15 via-muted-foreground/5 to-transparent blur-2xl" />
                  <div className="absolute bottom-[-90px] right-[-90px] h-[220px] w-[220px] rounded-full bg-gradient-to-tr from-muted-foreground/12 via-muted-foreground/5 to-transparent blur-2xl" />
                </div>
                {/* Citation */}
                <blockquote className="relative z-10 flex-1 text-pretty text-sm text-foreground/90 md:text-base">
                  « {t.quote} »
                </blockquote>

                {/* Auteur */}
                <footer className="relative z-10 mt-3 flex shrink-0 items-center gap-2.5 border-t border-border/60 pt-3">
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full",
                      "bg-muted text-xs font-semibold text-muted-foreground"
                    )}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}
                      {t.subtitle ? ` · ${t.subtitle}` : ""}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground/80">{t.date}</p>
                  </div>
                </footer>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile : [flèche gauche] [pagination au centre] [flèche droite]. Desktop : flèches en absolute sur les côtés, pagination en dessous */}
        <div className="mt-4 flex items-center justify-between gap-3 max-sm:flex-row sm:block">
          <button
            type="button"
            aria-label="Avis précédent"
            className={cn(
              "testimonials-swiper-prev z-10 shrink-0",
              "flex size-9 items-center justify-center rounded-full border bg-background shadow-md testimonial-avatar",
              "text-muted-foreground transition hover:border-primary/50 hover:text-primary",
              "focus:outline-none focus:ring-2 focus:ring-primary/30",
              "[&.swiper-button-disabled]:cursor-default [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:pointer-events-none",
              "max-sm:size-8",
              "sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:-translate-x-4"
            )}
          >
            <ChevronLeft className="h-4 w-4 max-sm:h-3.5 max-sm:w-3.5" strokeWidth={2} />
          </button>
          <div className="testimonials-pagination flex flex-1 justify-center gap-1 max-sm:min-w-0" />
          <button
            type="button"
            aria-label="Avis suivant"
            className={cn(
              "testimonials-swiper-next z-10 shrink-0",
              "flex size-9 items-center justify-center rounded-full border bg-background shadow-md testimonial-avatar",
              "text-muted-foreground transition hover:border-primary/50 hover:text-primary",
              "focus:outline-none focus:ring-2 focus:ring-primary/30",
              "[&.swiper-button-disabled]:cursor-default [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:pointer-events-none",
              "max-sm:size-8",
              "sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-4"
            )}
          >
            <ChevronRight className="h-4 w-4 max-sm:h-3.5 max-sm:w-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
