"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertCircle, AlertTriangle, Lightbulb } from "lucide-react";
import mermaid from "mermaid";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useTheme } from "@/components/ThemeProvider";
import { TrainingPromptCopyBlock } from "@/components/training/TrainingPromptCopyBlock";
import { stripCalloutLabelColonInBlockquoteLines } from "@/lib/training/normalize-callout-markdown";
import { slugifyHeading } from "@/lib/training/readme-toc";
import { rewriteTrainingMarkdownHref } from "@/lib/training/rewrite-href";
import { cn } from "@/lib/utils";

function stringifyChildren(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(stringifyChildren).join("");
  if (typeof node === "object" && "props" in node && node.props && typeof node.props === "object") {
    const props = node.props as { children?: ReactNode };
    if ("children" in props) return stringifyChildren(props.children);
  }
  return "";
}

function isBlankTextNode(node: ReactNode): boolean {
  return typeof node === "string" && node.trim().length === 0;
}

function isSingleElementOfType(node: ReactNode, tagName: string): boolean {
  const nodes = Children.toArray(node).filter((child) => !isBlankTextNode(child));
  if (nodes.length !== 1 || !isValidElement(nodes[0])) return false;
  const only = nodes[0] as ReactElement;
  return only.type === tagName;
}

function isIllustrationCaption(node: ReactNode): boolean {
  const text = stringifyChildren(node).trim().toLowerCase();
  return text.startsWith("illustration");
}

function normalizeCodeLanguage(language?: string): string | undefined {
  if (!language) return undefined;
  switch (language.toLowerCase()) {
    case "ts":
      return "typescript";
    case "js":
      return "javascript";
    case "md":
      return "markdown";
    case "sh":
    case "shell":
      return "bash";
    case "yml":
      return "yaml";
    default:
      return language.toLowerCase();
  }
}

const syntaxLightTheme = {
  'code[class*="language-"]': {
    color: "#1f2937",
    background: "none",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
    fontSize: "0.875rem",
    textAlign: "left" as const,
    whiteSpace: "pre-wrap" as const,
    wordSpacing: "normal",
    wordBreak: "break-word" as const,
    wordWrap: "break-word" as const,
    lineHeight: "1.7",
    tabSize: 2,
    hyphens: "none" as const,
  },
  'pre[class*="language-"]': {
    color: "#1f2937",
    background: "none",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
    fontSize: "0.875rem",
    textAlign: "left" as const,
    whiteSpace: "pre-wrap" as const,
    wordSpacing: "normal",
    wordBreak: "break-word" as const,
    wordWrap: "break-word" as const,
    lineHeight: "1.7",
    tabSize: 2,
    hyphens: "none" as const,
  },
  comment: { color: "#6b7280" },
  prolog: { color: "#6b7280" },
  doctype: { color: "#6b7280" },
  cdata: { color: "#6b7280" },
  punctuation: { color: "#4b5563" },
  property: { color: "#7c3aed" },
  tag: { color: "#be123c" },
  boolean: { color: "#b45309" },
  number: { color: "#b45309" },
  constant: { color: "#2563eb" },
  symbol: { color: "#2563eb" },
  deleted: { color: "#be123c" },
  selector: { color: "#0f766e" },
  "attr-name": { color: "#0f766e" },
  string: { color: "#047857" },
  char: { color: "#047857" },
  builtin: { color: "#2563eb" },
  inserted: { color: "#047857" },
  operator: { color: "#374151" },
  entity: { color: "#2563eb" },
  url: { color: "#2563eb" },
  atrule: { color: "#7c3aed" },
  "attr-value": { color: "#047857" },
  keyword: { color: "#7c3aed" },
  function: { color: "#2563eb" },
  "class-name": { color: "#c2410c" },
  regex: { color: "#0f766e" },
  important: { color: "#be123c", fontWeight: "600" },
  variable: { color: "#c2410c" },
  bold: { fontWeight: "700" },
  italic: { fontStyle: "italic" as const },
};

/** Liens explicites : le corps en `muted-foreground` faisait hériter un gris peu lisible sur les `<a>`. */
const trainingMarkdownLinkClass =
  "font-semibold text-primary underline decoration-primary/40 underline-offset-[3px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/** Citations « En bref » : libellé uppercase, plus grand, puis passage à la ligne avant le corps. */
const trainingCalloutEnBrefBodyClass = cn(
  "min-w-0 flex-1 space-y-3 [&_p]:m-0",
  "[&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/35 [&_a]:underline-offset-[3px]",
  "[&_p]:text-slate-700 dark:[&_p]:text-muted-foreground [&_p]:leading-relaxed",
  // Plusieurs paragraphes : 1er bloc = libellé seul, puis corps (sans filet).
  "[&_p:first-child:not(:only-child)]:mb-0 [&_p:first-child:not(:only-child)]:text-sm [&_p:first-child:not(:only-child)]:font-bold [&_p:first-child:not(:only-child)]:uppercase [&_p:first-child:not(:only-child)]:tracking-wide [&_p:first-child:not(:only-child)]:text-slate-600 dark:[&_p:first-child:not(:only-child)]:text-slate-300",
  "[&_p:first-child:not(:only-child)_strong]:font-bold [&_p:first-child:not(:only-child)_strong]:text-slate-700 dark:[&_p:first-child:not(:only-child)_strong]:text-slate-200",
  "[&_p:nth-child(2)]:mt-3 [&_p:nth-child(2)]:text-base [&_p:nth-child(2)]:font-normal [&_p:nth-child(2)]:leading-relaxed [&_p:nth-child(2)]:normal-case [&_p:nth-child(2)]:text-slate-800 dark:[&_p:nth-child(2)]:text-slate-100/95",
  "[&_p:nth-child(n+3)]:text-sm [&_p:nth-child(n+3)]:leading-relaxed [&_p:nth-child(n+3)]:text-slate-600 dark:[&_p:nth-child(n+3)]:text-slate-400",
  // Un seul paragraphe : 1er <strong> = libellé + retour à la ligne, le reste en corps.
  "[&_p:only-child]:text-base [&_p:only-child]:font-normal [&_p:only-child]:leading-relaxed [&_p:only-child]:text-slate-800 dark:[&_p:only-child]:text-slate-100/95 [&_p:only-child]:tracking-normal [&_p:only-child]:normal-case",
  "[&_p:only-child>strong:first-of-type]:mb-2 [&_p:only-child>strong:first-of-type]:block [&_p:only-child>strong:first-of-type]:w-full [&_p:only-child>strong:first-of-type]:text-sm [&_p:only-child>strong:first-of-type]:font-bold [&_p:only-child>strong:first-of-type]:uppercase [&_p:only-child>strong:first-of-type]:tracking-wide [&_p:only-child>strong:first-of-type]:text-slate-700 dark:[&_p:only-child>strong:first-of-type]:text-slate-200"
);

/** Citations « Attention » : même présentation que « En bref » (sans filet). */
const trainingCalloutAttentionBodyClass = cn(
  "min-w-0 flex-1 space-y-3 [&_p]:m-0",
  "[&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/40 [&_a]:underline-offset-[3px]",
  "[&_p]:leading-relaxed",
  "[&_p:first-child:not(:only-child)]:mb-0 [&_p:first-child:not(:only-child)]:text-sm [&_p:first-child:not(:only-child)]:font-bold [&_p:first-child:not(:only-child)]:uppercase [&_p:first-child:not(:only-child)]:tracking-wide [&_p:first-child:not(:only-child)]:text-rose-950 dark:[&_p:first-child:not(:only-child)]:text-rose-50",
  "[&_p:first-child:not(:only-child)_strong]:font-bold [&_p:first-child:not(:only-child)_strong]:text-rose-950 dark:[&_p:first-child:not(:only-child)_strong]:text-rose-50",
  "[&_p:nth-child(2)]:mt-3 [&_p:nth-child(2)]:text-base [&_p:nth-child(2)]:font-normal [&_p:nth-child(2)]:normal-case [&_p:nth-child(2)]:text-slate-800 dark:[&_p:nth-child(2)]:text-slate-100/95",
  "[&_p:nth-child(n+3)]:text-sm [&_p:nth-child(n+3)]:text-slate-600 dark:[&_p:nth-child(n+3)]:text-slate-400",
  "[&_p:only-child]:text-base [&_p:only-child]:font-normal [&_p:only-child]:text-slate-800 dark:[&_p:only-child]:text-slate-100/95 [&_p:only-child]:normal-case",
  "[&_p:only-child>strong:first-of-type]:mb-2 [&_p:only-child>strong:first-of-type]:block [&_p:only-child>strong:first-of-type]:w-full [&_p:only-child>strong:first-of-type]:text-sm [&_p:only-child>strong:first-of-type]:font-bold [&_p:only-child>strong:first-of-type]:uppercase [&_p:only-child>strong:first-of-type]:tracking-wide [&_p:only-child>strong:first-of-type]:text-rose-950 dark:[&_p:only-child>strong:first-of-type]:text-rose-50",
  "[&_p_strong]:font-semibold [&_p_strong]:text-slate-900 dark:[&_p_strong]:text-slate-50"
);

/** Citations « Prudence » : alerte orange / ambre (hameçonnage, vérification d’URL, etc.). */
const trainingCalloutPrudenceBodyClass = cn(
  "min-w-0 flex-1 space-y-3 [&_p]:m-0",
  "[&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/40 [&_a]:underline-offset-[3px]",
  "[&_p]:leading-relaxed",
  "[&_p:first-child:not(:only-child)]:mb-0 [&_p:first-child:not(:only-child)]:text-sm [&_p:first-child:not(:only-child)]:font-bold [&_p:first-child:not(:only-child)]:uppercase [&_p:first-child:not(:only-child)]:tracking-wide [&_p:first-child:not(:only-child)]:text-amber-950 dark:[&_p:first-child:not(:only-child)]:text-amber-50",
  "[&_p:first-child:not(:only-child)_strong]:font-bold [&_p:first-child:not(:only-child)_strong]:text-amber-950 dark:[&_p:first-child:not(:only-child)_strong]:text-amber-50",
  "[&_p:nth-child(2)]:mt-3 [&_p:nth-child(2)]:text-base [&_p:nth-child(2)]:font-normal [&_p:nth-child(2)]:normal-case [&_p:nth-child(2)]:text-slate-800 dark:[&_p:nth-child(2)]:text-slate-100/95",
  "[&_p:nth-child(n+3)]:text-sm [&_p:nth-child(n+3)]:text-slate-600 dark:[&_p:nth-child(n+3)]:text-slate-400",
  "[&_p:only-child]:text-base [&_p:only-child]:font-normal [&_p:only-child]:text-slate-800 dark:[&_p:only-child]:text-slate-100/95 [&_p:only-child]:normal-case",
  "[&_p:only-child>strong:first-of-type]:mb-2 [&_p:only-child>strong:first-of-type]:block [&_p:only-child>strong:first-of-type]:w-full [&_p:only-child>strong:first-of-type]:text-sm [&_p:only-child>strong:first-of-type]:font-bold [&_p:only-child>strong:first-of-type]:uppercase [&_p:only-child>strong:first-of-type]:tracking-wide [&_p:only-child>strong:first-of-type]:text-amber-950 dark:[&_p:only-child>strong:first-of-type]:text-amber-50",
  "[&_p_strong]:font-semibold [&_p_strong]:text-slate-900 dark:[&_p_strong]:text-slate-50"
);

type TrainingProseProps = {
  content: string;
  className?: string;
};

type MarkdownNodeWithPosition = {
  position?: {
    start?: {
      line?: number | null;
    };
  };
};

function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}

function getStableHeadingId(title: string, node?: MarkdownNodeWithPosition) {
  const base = slugifyHeading(title) || "section";
  const line = node?.position?.start?.line;
  return typeof line === "number" && Number.isFinite(line) ? `${base}-${line}` : base;
}

function PersistedMarkdownCheckbox({
  storageKey,
  defaultChecked,
}: {
  storageKey: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(Boolean(defaultChecked));

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved == null) return;
      setChecked(saved === "1");
    } catch {
      // Ignore storage failures and keep the checkbox usable.
    }
  }, [storageKey]);

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => {
        const next = event.currentTarget.checked;
        setChecked(next);
        try {
          window.localStorage.setItem(storageKey, next ? "1" : "0");
        } catch {
          // Ignore storage failures and keep the checkbox usable.
        }
      }}
      className="mt-1 h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
    />
  );
}

function MermaidBlock({
  chart,
  theme,
}: {
  chart: string;
  theme: "light" | "dark";
}) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reactId = useId();
  const mermaidId = useMemo(
    () => `training-mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [reactId]
  );

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === "dark" ? "dark" : "default",
          securityLevel: "loose",
          themeVariables: {
            fontSize: "18px",
          },
          flowchart: {
            useMaxWidth: false,
            nodeSpacing: 40,
            rankSpacing: 55,
          },
        });

        const { svg: renderedSvg } = await mermaid.render(mermaidId, chart);
        if (cancelled) return;
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Rendu Mermaid impossible.";
        setError(message);
        setSvg(null);
      }
    }

    renderDiagram();
    return () => {
      cancelled = true;
    };
  }, [chart, mermaidId, theme]);

  if (error) {
    return (
      <div className="my-4 rounded-lg border border-amber-300/70 bg-amber-50/80 p-4 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
        <p className="mb-3 font-medium">Le schéma Mermaid n&apos;a pas pu être rendu.</p>
        <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-background/70 p-3 font-mono text-xs">
          {chart}
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-4 rounded-lg border border-border/70 bg-muted/30 px-4 py-3 text-sm text-slate-600 dark:text-muted-foreground">
        Rendu du schéma...
      </div>
    );
  }

  return (
    <div
      className={cn(
        "my-4 overflow-x-auto rounded-xl border p-4 shadow-sm",
        theme === "light"
          ? "border-slate-200 bg-white text-slate-900"
          : "border-slate-800 bg-slate-950 text-slate-100"
      )}
    >
      <div
        className="inline-block min-w-full [&_svg]:block [&_svg]:h-auto [&_svg]:max-w-none"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}

export function TrainingProse({ content, className }: TrainingProseProps) {
  const { theme } = useTheme();
  const pathname = usePathname();
  const markdown = useMemo(() => stripCalloutLabelColonInBlockquoteLines(content), [content]);
  const checkboxStoragePrefix = useMemo(
    () => `training-checklist:${pathname ?? "unknown"}:${hashString(markdown)}`,
    [markdown, pathname]
  );
  const codeBlockTheme = theme === "light" ? "light" : "dark";
  let checkboxIndex = 0;

  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-28 prose-headings:font-semibold prose-table:text-base",
        "prose-p:text-pretty prose-p:leading-[1.75] prose-li:text-pretty prose-li:leading-[1.7]",
        "prose-h1:text-titre-moyen prose-h2:text-titre-petit prose-h3:text-paragraphe prose-h3:font-semibold",
        "prose-a:text-primary",
        /* `prose-code` + `dark:prose-invert` forçaient un gris peu lisible : le rendu inline est géré par le composant `code`. */
        "prose-code:before:content-none prose-code:after:content-none",
        "[&_pre>code]:rounded-none [&_pre>code]:border-0 [&_pre>code]:bg-transparent [&_pre>code]:p-0 [&_pre>code]:font-mono [&_pre>code]:text-sm [&_pre>code]:font-normal [&_pre>code]:text-inherit [&_pre>code]:whitespace-pre-wrap [&_pre>code]:break-words",
        "prose-pre:bg-muted/80 prose-pre:border prose-pre:border-border [&_pre]:my-4 [&_pre]:max-w-full [&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/80 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:text-foreground",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, className }) => {
            const raw = href ?? "";
            const next = rewriteTrainingMarkdownHref(raw);
            const isExternal = /^https?:\/\//i.test(next);
            const merged = cn(trainingMarkdownLinkClass, className);
            if (isExternal) {
              return (
                <a href={next} target="_blank" rel="noopener noreferrer" className={merged}>
                  {children}
                </a>
              );
            }
            return (
              <Link href={next} className={merged}>
                {children}
              </Link>
            );
          },
          pre: ({ children }) => {
            const arr = Children.toArray(children);
            if (arr.length === 1 && isValidElement(arr[0])) {
              const only = arr[0] as ReactElement<{ className?: string; children?: ReactNode }>;
              const cls = only.props?.className;
              const raw = stringifyChildren(only.props?.children ?? "").replace(/\r\n/g, "\n");
              if (typeof cls === "string" && /\blanguage-copyprompt\b/.test(cls)) {
                return <TrainingPromptCopyBlock text={raw.replace(/\n+\s*$/, "")} />;
              }
              const match = typeof cls === "string" ? /\blanguage-([\w-]+)\b/.exec(cls) : null;
              const language = normalizeCodeLanguage(match?.[1]);
              if (language === "mermaid") {
                return <MermaidBlock chart={raw.replace(/\n+\s*$/, "")} theme={codeBlockTheme} />;
              }
              return (
                <div
                  className={cn(
                    "my-4 overflow-x-auto rounded-lg border p-4 text-sm leading-relaxed shadow-sm",
                    codeBlockTheme === "light"
                      ? "border-slate-200 bg-slate-50 text-slate-900"
                      : "border-slate-800 bg-slate-950 text-slate-100"
                  )}
                >
                  <SyntaxHighlighter
                    language={language}
                    style={codeBlockTheme === "light" ? syntaxLightTheme : oneDark}
                    PreTag="div"
                    wrapLongLines
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: "transparent",
                      overflow: "visible",
                      fontSize: "0.875rem",
                      lineHeight: "1.7",
                    }}
                    codeTagProps={{
                      className: "font-mono",
                    }}
                  >
                    {raw.replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              );
            }
            const inner =
              arr.length === 1 && isValidElement(arr[0])
                ? cloneElement(arr[0] as ReactElement<{ "data-md-fenced"?: string }>, {
                    "data-md-fenced": "true",
                  })
                : children;
            return <pre>{inner}</pre>;
          },
          code: ({ className, children, ...rest }) => {
            const fenced =
              (rest as { "data-md-fenced"?: string })["data-md-fenced"] === "true" ||
              (typeof className === "string" && /\blanguage-[\w-]+\b/.test(className));
            if (fenced) {
              return (
                <code
                  className={cn(
                    "block w-full min-w-0 max-w-full whitespace-pre-wrap break-words font-mono text-sm font-normal text-foreground",
                    className
                  )}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className={cn(
                  "rounded-md border border-border/80 bg-muted/70 px-1.5 py-0.5 font-mono text-[0.875em] font-medium leading-snug text-foreground",
                  "dark:border-border/60 dark:bg-muted/40",
                  className
                )}
              >
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="mb-8 text-titre-moyen font-semibold tracking-tight text-foreground md:mb-10">
              {children}
            </h1>
          ),
          h2: ({ children, node }) => {
            const text = stringifyChildren(children).replace(/\*\*/g, "").trim();
            const id = getStableHeadingId(text, node as MarkdownNodeWithPosition | undefined);
            return (
              <h2
                id={id || undefined}
                data-training-heading="true"
                data-training-heading-level={2}
                data-training-heading-title={text}
                className="mb-5 mt-14 scroll-mt-28 text-titre-petit font-semibold tracking-tight text-foreground first-of-type:mt-8 md:mb-6 md:mt-16 md:first-of-type:mt-10"
              >
                {children}
              </h2>
            );
          },
          h3: ({ children, node }) => {
            const text = stringifyChildren(children).replace(/\*\*/g, "").trim();
            const id = getStableHeadingId(text, node as MarkdownNodeWithPosition | undefined);
            return (
              <h3
                id={id || undefined}
                data-training-heading="true"
                data-training-heading-level={3}
                data-training-heading-title={text}
                className="mb-3 mt-9 scroll-mt-28 text-paragraphe font-semibold tracking-tight text-foreground md:mb-4 md:mt-10"
              >
                {children}
              </h3>
            );
          },
          p: ({ children }) => {
            if (isSingleElementOfType(children, "img")) {
              return <p className="mb-3">{children}</p>;
            }

            if (isIllustrationCaption(children)) {
              return (
                <p className="-mt-0.5 mb-3 text-center text-[0.9rem] leading-relaxed text-slate-600 dark:text-muted-foreground/85 md:mb-3">
                  {children}
                </p>
              );
            }

            return (
              <p className="mb-6 text-pretty text-paragraphe leading-[1.75] text-slate-700 dark:text-muted-foreground md:mb-7 md:leading-[1.8] [&_a]:text-primary">
                {children}
              </p>
            );
          },
          img: ({ src, alt, title }) => (
            <img
              src={src ?? ""}
              alt={alt ?? ""}
              title={title}
              loading="lazy"
              className="my-0 w-full rounded-xl border border-border/60 shadow-sm"
            />
          ),
          ul: ({ children, className }) => (
            <ul
              className={cn(
                "my-6 list-outside list-disc space-y-3 pl-6 text-slate-700 marker:text-slate-500 dark:text-muted-foreground dark:marker:text-muted-foreground/70 md:my-8 md:space-y-3.5 [&_a]:text-primary",
                typeof className === "string" && /\bcontains-task-list\b/.test(className) && "list-none pl-0"
              )}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 list-outside list-decimal space-y-3 pl-6 text-slate-700 marker:font-medium marker:text-slate-500 dark:text-muted-foreground dark:marker:text-muted-foreground md:my-8 md:space-y-3.5 [&_a]:text-primary">
              {children}
            </ol>
          ),
          li: ({ children, className }) => {
            const isTaskListItem = typeof className === "string" && /\btask-list-item\b/.test(className);

            if (!isTaskListItem) {
              return (
                <li className="text-pretty leading-[1.7] [&>p]:mb-3 [&>p:last-child]:mb-0 [&_a]:text-primary">
                  {children}
                </li>
              );
            }

            const nodes = Children.toArray(children).filter((node) => !isBlankTextNode(node));
            const [checkbox, ...content] = nodes;

            return (
              <li className="list-none">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/70 bg-card/40 px-4 py-3 shadow-sm transition-colors hover:bg-muted/25">
                  <span className="pt-0.5">{checkbox}</span>
                  <div className="min-w-0 flex-1 text-slate-700 dark:text-muted-foreground [&>*:last-child]:mb-0 [&_a]:text-primary [&_p]:my-0 [&_p]:text-paragraphe [&_p]:leading-[1.7]">
                    {content}
                  </div>
                </label>
              </li>
            );
          },
          input: ({ type, checked, className, ...props }) => {
            if (type !== "checkbox") {
              return <input type={type} className={className} {...props} />;
            }

            const currentIndex = checkboxIndex;
            checkboxIndex += 1;

            return (
              <PersistedMarkdownCheckbox
                storageKey={`${checkboxStoragePrefix}:${currentIndex}`}
                defaultChecked={Boolean(checked)}
              />
            );
          },
          hr: () => <hr className="my-10 border-border/50 md:my-14" />,
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto rounded-xl border border-border/70 bg-card/40 shadow-sm md:my-10">
              <table className="mb-0 w-full min-w-[42rem] border-collapse text-left text-base leading-relaxed text-foreground [&_th:nth-child(2)]:text-right [&_td:nth-child(2)]:text-right [&_td:nth-child(2)]:tabular-nums">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead>{children}</thead>,
          tbody: ({ children }) => (
            <tbody className="[&_tr:last-child_td]:border-b-0 [&_tr:nth-child(even)]:bg-muted/10">{children}</tbody>
          ),
          tr: ({ children }) => <tr className="transition-colors hover:bg-muted/25">{children}</tr>,
          th: ({ children }) => (
            <th className="border-b border-border/80 bg-muted/45 px-4 py-3.5 text-sm font-semibold tracking-wide text-foreground first:pl-5 last:pr-5 sm:px-5 sm:py-4">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border/45 px-4 py-3.5 align-top text-slate-700 dark:text-muted-foreground first:pl-5 last:pr-5 sm:px-5 sm:py-4 [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/40 hover:[&_a]:decoration-primary">
              {children}
            </td>
          ),
          blockquote: ({ children }) => {
            const flat = stringifyChildren(children).toLowerCase();
            const isEnBrefCallout = flat.includes("en bref");
            const isAttentionCallout = flat.includes("attention");
            const isPrudenceWarn = flat.includes("prudence") && !isAttentionCallout;

            if (isEnBrefCallout) {
              return (
                <blockquote className="not-prose my-10 text-pretty md:my-12">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-slate-50/98 to-blue-50/35 shadow-sm",
                      "dark:border-slate-600/50 dark:from-slate-950/50 dark:via-slate-950/40 dark:to-slate-900/30 dark:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.06)]",
                      "ring-1 ring-slate-300/45 dark:ring-slate-600/35"
                    )}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/90 to-transparent dark:via-slate-500/40"
                      aria-hidden
                    />
                    <div className="flex gap-0">
                      <div
                        className="w-1 shrink-0 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-400 dark:from-slate-500 dark:via-slate-400 dark:to-slate-600 sm:w-1.5"
                        aria-hidden
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-5 sm:p-7">
                        <div
                          className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-200/95 text-neutral-950 shadow-sm ring-1 ring-slate-300/70",
                            "dark:bg-slate-600/85 dark:text-white dark:shadow-md dark:ring-slate-500/50"
                          )}
                          aria-hidden
                        >
                          <Lightbulb className="h-5 w-5 text-current" strokeWidth={2} />
                        </div>
                        <div className={trainingCalloutEnBrefBodyClass}>{children}</div>
                      </div>
                    </div>
                  </div>
                </blockquote>
              );
            }

            if (isAttentionCallout) {
              return (
                <blockquote className="not-prose my-10 text-pretty md:my-12">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl border border-rose-200/85 bg-gradient-to-br from-rose-50 via-red-50/95 to-orange-50/30 shadow-sm",
                      "dark:border-red-900/45 dark:from-red-950/50 dark:via-red-950/38 dark:to-orange-950/25 dark:shadow-[inset_0_1px_0_0_rgba(248,113,113,0.07)]",
                      "ring-1 ring-rose-200/60 dark:ring-red-900/40"
                    )}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-400/55 to-transparent dark:via-red-500/35"
                      aria-hidden
                    />
                    <div className="flex gap-0">
                      <div
                        className="w-1 shrink-0 bg-gradient-to-b from-rose-500 via-red-500 to-rose-600 dark:from-red-500 dark:via-rose-500 dark:to-red-700 sm:w-1.5"
                        aria-hidden
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-5 sm:p-7">
                        <div
                          className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-rose-600 shadow-sm ring-1 ring-rose-200/90",
                            "dark:bg-red-950/70 dark:text-rose-100 dark:ring-red-800/60 dark:shadow-md"
                          )}
                          aria-hidden
                        >
                          <AlertTriangle className="h-5 w-5 text-current" strokeWidth={2.1} />
                        </div>
                        <div className={trainingCalloutAttentionBodyClass}>{children}</div>
                      </div>
                    </div>
                  </div>
                </blockquote>
              );
            }

            if (isPrudenceWarn) {
              return (
                <blockquote className="not-prose my-10 text-pretty md:my-12">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50 via-orange-50/92 to-amber-100/35 shadow-sm",
                      "dark:border-amber-900/45 dark:from-amber-950/50 dark:via-orange-950/32 dark:to-amber-950/22 dark:shadow-[inset_0_1px_0_0_rgba(251,191,36,0.08)]",
                      "ring-1 ring-amber-200/65 dark:ring-amber-800/40"
                    )}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent dark:via-amber-500/35"
                      aria-hidden
                    />
                    <div className="flex gap-0">
                      <div
                        className="w-1 shrink-0 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600 dark:from-amber-600 dark:via-orange-600 dark:to-amber-800 sm:w-1.5"
                        aria-hidden
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-5 sm:p-7">
                        <div
                          className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm ring-1 ring-amber-200/90",
                            "dark:bg-amber-950/75 dark:text-amber-200 dark:ring-amber-800/55 dark:shadow-md"
                          )}
                          aria-hidden
                        >
                          <AlertCircle className="h-5 w-5 text-current" strokeWidth={2.1} />
                        </div>
                        <div className={trainingCalloutPrudenceBodyClass}>{children}</div>
                      </div>
                    </div>
                  </div>
                </blockquote>
              );
            }

            return (
              <blockquote
                className={cn(
                  "my-8 rounded-xl border border-border/70 bg-muted/25 px-5 py-4 text-pretty not-italic md:my-10 md:px-6 md:py-5",
                  "border-t-[3px] border-t-border",
                  "text-slate-700 dark:text-muted-foreground [&_a]:font-semibold [&_a]:text-primary"
                )}
              >
                {children}
              </blockquote>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
