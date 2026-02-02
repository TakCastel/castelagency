"use client";

import { useState, useEffect } from "react";

const REDUCE_SCROLL_MOTION_MEDIA = "(max-width: 767px), (prefers-reduced-motion: reduce)";

/**
 * Retourne true quand les animations liées au scroll doivent être désactivées :
 * - viewport mobile (≤767px) pour éviter le lag sur tactile
 * - préférence système "réduire les animations"
 */
export function useReduceScrollMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(REDUCE_SCROLL_MOTION_MEDIA);
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduce;
}
