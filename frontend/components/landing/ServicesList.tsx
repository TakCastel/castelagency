"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimatedSection } from "@/components/landing/AnimatedSection";

export type ServiceItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
};

type ServicesListProps = {
  services: ServiceItem[];
};

/**
 * Liste verticale des services : carte avec illustration (alternance gauche/droite)
 * et lien vers la page détaillée. Présentation différente de la FeatureGrid d’accueil.
 */
export function ServicesList({ services }: ServicesListProps) {
  return (
    <ul className="space-y-16 md:space-y-24" role="list">
      {services.map((service, index) => {
        const isImageRight = index % 2 === 1;
        return (
          <li key={service.href}>
            <AnimatedSection delay={index}>
              <Link
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center md:gap-10 lg:gap-14"
              >
                <div
                  className={[
                    "relative h-56 w-full shrink-0 md:h-72 md:min-w-[42%] md:max-w-[45%]",
                    isImageRight ? "md:order-2" : "md:order-1",
                  ].join(" ")}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div
                  className={[
                    "flex flex-1 flex-col justify-center px-6 py-6 md:px-8 md:py-8",
                    isImageRight ? "md:order-1 md:text-left" : "md:order-2 md:text-left",
                  ].join(" ")}
                >
                  <h2 className="text-titre-petit font-semibold tracking-tight text-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-paragraphe text-muted-foreground text-pretty">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-small font-medium text-primary group-hover:underline">
                    En savoir plus
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          </li>
        );
      })}
    </ul>
  );
}
