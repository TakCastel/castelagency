"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReduceScrollMotion } from "@/lib/use-reduce-scroll-motion";

const ILLU_SRC = "/assets/illustrations/illu-1.png";
const IMG_ASPECT = 800 / 500;

type ScrollIllustrationProps = {
  scrollTargetRef: RefObject<HTMLElement | null>;
  variant?: "desktop" | "mobile";
};

export function ScrollIllustration({ scrollTargetRef, variant = "desktop" }: ScrollIllustrationProps) {
  const reduceScrollMotion = useReduceScrollMotion();

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start end", "center center"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [variant === "mobile" ? -220 : -120, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.5, 0.8, 1, 1]);

  return (
    <motion.div
      className={`relative w-[400px] shrink-0 md:w-[520px] lg:w-full ${variant === "desktop" ? "lg:min-h-[380px]" : ""}`}
      style={{
        ...(variant === "mobile" ? { aspectRatio: IMG_ASPECT } : {}),
        ...(reduceScrollMotion ? { x: 0, rotate: 0, opacity: 1 } : { x, rotate, opacity, willChange: "transform" })
      }}
    >
      {/* Wrapper pour coins arrondis uniquement — pas d’ombre pour éviter l’effet « carte » en tablette */}
      <div className="h-full w-full overflow-hidden rounded-3xl">
        <Image
          src={ILLU_SRC}
          alt="Création web en harmonie avec l'environnement, illustration gravure"
          width={600}
          height={375}
          className={`h-full w-full object-contain object-center ${variant === "desktop" ? "lg:object-cover lg:min-h-[380px]" : ""}`}
          style={{ borderRadius: "1.5rem" }}
          sizes="(max-width: 767px) 400px, (max-width: 1023px) 520px, 600px"
          quality={75}
          priority={false}
        />
      </div>
    </motion.div>
  );
}
