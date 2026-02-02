"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useReduceScrollMotion } from "@/lib/use-reduce-scroll-motion";

const BIO_IMAGE = "/assets/illustrations/illu-bio.png";

type BioSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function BioSection({ children, className }: BioSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceScrollMotion = useReduceScrollMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-120, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.5, 0.8, 1, 1]);

  return (
    <section
      ref={sectionRef}
      id="bio"
      aria-labelledby="bio-title"
      className={cn(className)}
    >
      <h2 id="bio-title" className="text-titre-petit font-semibold tracking-tight">
        Bio
      </h2>
      <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
        <figure className="w-full shrink-0 sm:w-80 md:w-96">
          <motion.div
            className="rounded-xl border border-border bg-muted shadow-lg w-full overflow-hidden"
            style={{
              ...(reduceScrollMotion ? { x: 0, rotate: 0, opacity: 1 } : { x, rotate, opacity, willChange: "transform" })
            }}
          >
            <Image
              src={BIO_IMAGE}
              alt="Photo de Tarik Talhaoui"
              width={384}
              height={480}
              className="w-full h-auto block"
              sizes="(max-width: 640px) 100vw, 24rem"
              priority={false}
            />
          </motion.div>
        </figure>
        <div className="min-w-0 flex-1 space-y-4">
          {children}
        </div>
      </div>
    </section>
  );
}
