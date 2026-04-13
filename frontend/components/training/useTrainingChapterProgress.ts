"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type TrainingHeading = {
  id: string;
  title: string;
  level: 2 | 3;
  order: number;
  top: number;
  mainIndex: number;
};

const ARTICLE_SELECTOR = "[data-training-article]";
const HEADING_SELECTOR = "[data-training-heading='true']";
const SCROLL_CONTAINER_SELECTOR = "[data-training-scroll-container]";

function resolveScrollContainer() {
  const element = document.querySelector<HTMLElement>(SCROLL_CONTAINER_SELECTOR);
  if (!element) return null;

  const styles = window.getComputedStyle(element);
  const allowsInnerScroll = /(auto|scroll|overlay)/.test(styles.overflowY);
  const canActuallyScroll = element.scrollHeight - element.clientHeight > 1;
  return allowsInnerScroll && canActuallyScroll ? element : null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getDocumentScrollTop() {
  const root = document.documentElement;
  return window.scrollY ?? root.scrollTop ?? 0;
}

function getDocumentScrollable() {
  const root = document.documentElement;
  return Math.max(0, root.scrollHeight - root.clientHeight);
}

function getHeadingTop(element: HTMLElement, container: HTMLElement | null) {
  if (!container) {
    return element.getBoundingClientRect().top + getDocumentScrollTop();
  }

  return (
    element.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop
  );
}

function areSameHeadings(a: TrainingHeading[], b: TrainingHeading[]) {
  if (a.length !== b.length) return false;
  return a.every((item, index) => {
    const other = b[index];
    return (
      other &&
      item.id === other.id &&
      item.title === other.title &&
      item.level === other.level &&
      item.order === other.order &&
      item.mainIndex === other.mainIndex &&
      Math.abs(item.top - other.top) < 1
    );
  });
}

function collectHeadings(article: HTMLElement | null, container: HTMLElement | null): TrainingHeading[] {
  if (!article) return [];

  const nodes = Array.from(article.querySelectorAll<HTMLElement>(HEADING_SELECTOR));
  let mainIndex = 0;

  return nodes.map((element, order) => {
    const level = Number(element.dataset.trainingHeadingLevel) === 3 ? 3 : 2;
    if (level === 2) {
      mainIndex += 1;
    }

    return {
      id: element.id,
      title: element.dataset.trainingHeadingTitle?.trim() || element.textContent?.trim() || "Section",
      level,
      order,
      top: getHeadingTop(element, container),
      mainIndex: level === 2 ? mainIndex : Math.max(mainIndex, 1),
    };
  });
}

export function useTrainingChapterProgress(watchKey?: string) {
  const [headings, setHeadings] = useState<TrainingHeading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ratio, setRatio] = useState(0);
  const [scrollable, setScrollable] = useState(0);

  const headingsRef = useRef<TrainingHeading[]>([]);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const scrollToHeading = useCallback((id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getArticle = () => document.querySelector<HTMLElement>(ARTICLE_SELECTOR);
    const handleScroll = () => updateFromScroll();

    const bindScrollContainer = () => {
      const nextContainer = resolveScrollContainer();
      if (scrollContainerRef.current === nextContainer) return nextContainer;

      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }

      scrollContainerRef.current = nextContainer;
      if (nextContainer) {
        nextContainer.addEventListener("scroll", handleScroll, { passive: true });
      }

      return nextContainer;
    };

    const updateFromScroll = (source: TrainingHeading[] = headingsRef.current) => {
      const container = bindScrollContainer();
      const currentScrollTop = container ? container.scrollTop : getDocumentScrollTop();
      const currentScrollable = container
        ? Math.max(0, container.scrollHeight - container.clientHeight)
        : getDocumentScrollable();

      setScrollable(currentScrollable);
      setRatio(currentScrollable <= 0 ? 0 : clamp(currentScrollTop / currentScrollable, 0, 1));

      const focusLine = currentScrollTop + (container ? 112 : 144);
      const activeHeading =
        source.reduce<TrainingHeading | null>((latest, heading) => {
          return heading.top <= focusLine ? heading : latest;
        }, null) ?? source[0] ?? null;

      setActiveId((current) => (current === activeHeading?.id ? current : activeHeading?.id ?? null));
    };

    const measure = () => {
      const container = bindScrollContainer();
      const article = getArticle();
      const nextHeadings = collectHeadings(article, container);
      headingsRef.current = nextHeadings;
      setHeadings((current) => (areSameHeadings(current, nextHeadings) ? current : nextHeadings));
      updateFromScroll(nextHeadings);
    };

    const rafId = window.requestAnimationFrame(measure);
    const timeoutId = window.setTimeout(measure, 180);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    const resizeObserver = new ResizeObserver(measure);
    const article = getArticle();
    const scrollContainer = bindScrollContainer();
    if (article) resizeObserver.observe(article);
    if (scrollContainer) resizeObserver.observe(scrollContainer);
    resizeObserver.observe(document.documentElement);

    const mutationObserver = new MutationObserver(() => {
      window.requestAnimationFrame(measure);
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
      scrollContainerRef.current = null;
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [watchKey]);

  const mainHeadings = useMemo(
    () => headings.filter((heading) => heading.level === 2),
    [headings]
  );

  const activeMainHeading = useMemo(() => {
    if (!mainHeadings.length) return null;
    const activeHeading = headings.find((heading) => heading.id === activeId) ?? null;
    if (!activeHeading) return mainHeadings[0] ?? null;
    if (activeHeading.level === 2) return activeHeading;
    return (
      [...mainHeadings].reverse().find((heading) => heading.order <= activeHeading.order) ??
      mainHeadings[0] ??
      null
    );
  }, [activeId, headings, mainHeadings]);

  return {
    headings,
    mainHeadings,
    activeId,
    activeMainHeading,
    ratio,
    scrollable,
    scrollToHeading,
  };
}
