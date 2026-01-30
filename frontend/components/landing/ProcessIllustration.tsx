"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const ILLU_SRC = "/illu-2.png";
const IMG_ASPECT = 800 / 500;

type ProcessIllustrationProps = {
  scrollTargetRef: RefObject<HTMLElement | null>;
  variant?: "desktop" | "mobile";
};

export function ProcessIllustration({ scrollTargetRef, variant = "desktop" }: ProcessIllustrationProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start end", "center center"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [variant === "mobile" ? 220 : 120, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.5, 0.8, 1, 1]);

  return (
    <motion.div
      className={`relative w-[400px] shrink-0 md:w-[520px] lg:w-full ${variant === "desktop" ? "lg:min-h-[380px]" : ""}`}
      style={{
        ...(variant === "mobile" ? { aspectRatio: IMG_ASPECT } : {}),
        ...(prefersReducedMotion ? {} : { x, rotate, opacity })
      }}
    >
      <div className="h-full w-full overflow-hidden rounded-3xl shadow-lg">
        <Image
          src={ILLU_SRC}
          alt="Ma méthode, illustration gravure"
          width={800}
          height={500}
          className={`h-full w-full object-contain object-center ${variant === "desktop" ? "lg:object-cover lg:min-h-[380px]" : ""}`}
          style={{ borderRadius: "1.5rem" }}
          sizes="(max-width: 767px) 400px, (max-width: 1023px) 520px, 33vw"
          priority={false}
        />
      </div>
    </motion.div>
  );
}
