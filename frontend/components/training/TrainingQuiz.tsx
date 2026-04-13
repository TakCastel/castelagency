"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { rewriteTrainingMarkdownHref } from "@/lib/training/rewrite-href";
import { cn } from "@/lib/utils";
import type { QuizChoiceKey, TrainingQuizItem, TrainingQuizModuleId } from "@/lib/training/parse-qcm-from-markdown";

const MODULE_LABELS: Record<TrainingQuizModuleId, string> = {
  assistants: "Assistants, agents et Markdown",
  bmad: "Cadrage, BMAD et synthèse",
  geo: "Produit IA, APIs et GEO",
  security: "Fondamentaux et sécurité",
};

type Filter = "all" | TrainingQuizModuleId;

type TrainingQuizProps = {
  items: TrainingQuizItem[];
  className?: string;
};

function InlineMarkdown({
  content,
  className,
  inline = false,
}: {
  content: string;
  className?: string;
  inline?: boolean;
}) {
  const Wrapper = inline ? "span" : "div";

  return (
    <Wrapper className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <>{children}</>,
          a: ({ href, children }) => {
            const next = rewriteTrainingMarkdownHref(href ?? "");
            const isExternal = /^https?:\/\//i.test(next);
            const linkClass =
              "font-semibold text-primary underline decoration-primary/40 underline-offset-[3px] transition-colors hover:text-primary hover:decoration-primary";
            if (isExternal) {
              return (
                <a href={next} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {children}
                </a>
              );
            }
            return (
              <Link href={next} className={linkClass}>
                {children}
              </Link>
            );
          },
          code: ({ children }) => (
            <code className="rounded-md border border-border/80 bg-muted/70 px-1.5 py-0.5 font-mono text-[0.875em] font-medium leading-snug text-foreground dark:border-border/60 dark:bg-muted/40">
              {children}
            </code>
          ),
          ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </Wrapper>
  );
}

export function TrainingQuiz({ items, className }: TrainingQuizProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [answers, setAnswers] = useState<Partial<Record<string, QuizChoiceKey>>>({});
  const [submitted, setSubmitted] = useState(false);

  const visibleItems = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((q) => q.moduleId === filter);
  }, [items, filter]);

  const setAnswer = (id: string, key: QuizChoiceKey) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: key }));
  };

  const handleFilterChange = (next: Filter) => {
    setFilter(next);
    setSubmitted(false);
    setAnswers({});
  };

  const score = useMemo(() => {
    if (!submitted) return null;
    let ok = 0;
    for (const q of visibleItems) {
      if (answers[q.id] === q.correctKey) ok += 1;
    }
    return { ok, total: visibleItems.length };
  }, [submitted, visibleItems, answers]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setAnswers({});
  };

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-muted/30 p-4 text-small text-muted-foreground">
        Banque QCM indisponible (fichier source introuvable ou format inattendu).
      </p>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-titre-petit font-semibold text-foreground">QCM interactif</h2>
          <p className="mt-1 text-small text-muted-foreground">
            Sélectionnez un module ou la banque complète, répondez puis validez pour voir le score.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "assistants", "bmad", "geo", "security"] as const).map((key) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={filter === key ? "default" : "outline"}
              onClick={() => handleFilterChange(key)}
            >
              {key === "all" ? "Tout" : MODULE_LABELS[key]}
            </Button>
          ))}
        </div>
      </div>

      {submitted && score && (
        <div
          className="rounded-xl border border-border bg-card p-4 text-paragraphe"
          role="status"
        >
          <p className="font-semibold text-foreground">
            Résultat : {score.ok} / {score.total} bonnes réponses
            {score.total > 0 ? ` (${Math.round((score.ok / score.total) * 100)} %)` : ""}
          </p>
          <p className="mt-1 text-small text-muted-foreground">
            Les bonnes réponses et leurs explications s’affichent maintenant directement sous chaque question.
          </p>
          <Button type="button" variant="outline" size="sm" className="mt-3" onClick={handleReset}>
            Recommencer
          </Button>
        </div>
      )}

      <ol className="space-y-8">
        {visibleItems.map((q, idx) => {
          const selected = answers[q.id];
          const correct = submitted && selected === q.correctKey;
          const wrong = submitted && selected !== undefined && selected !== q.correctKey;
          return (
            <li
              key={q.id}
              className={cn(
                "rounded-2xl border p-4 sm:p-5",
                correct && "border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-950/20",
                wrong && "border-rose-500 bg-rose-600 text-white shadow-lg shadow-rose-950/20",
                !submitted && "border-border/80 bg-muted/20"
              )}
            >
              <p
                className={cn(
                  "text-small font-medium",
                  submitted ? "text-white/85" : "text-muted-foreground"
                )}
              >
                Question {idx + 1} · {MODULE_LABELS[q.moduleId]} · {q.id}
              </p>
              <InlineMarkdown
                content={q.prompt}
                className={cn(
                  "mt-2 text-pretty text-paragraphe leading-relaxed",
                  submitted ? "text-white [&_code]:border-white/20 [&_code]:bg-white/10 [&_code]:text-white" : "text-foreground"
                )}
              />
              <fieldset className="mt-4 space-y-2">
                <legend className="sr-only">Choix pour la question {q.id}</legend>
                {q.choices.map((c) => {
                  const id = `${q.id}-${c.key}`;
                  const isSelected = selected === c.key;
                  const showCorrect = submitted && c.key === q.correctKey;
                  const showWrong = submitted && isSelected && c.key !== q.correctKey;
                  return (
                    <label
                      key={c.key}
                      htmlFor={id}
                      className={cn(
                        "flex cursor-pointer gap-3 rounded-lg border px-3 py-2.5 text-small transition-colors",
                        !submitted && isSelected && "border-primary bg-primary/10",
                        !submitted && !isSelected && "border-transparent bg-background/60 hover:bg-muted/80",
                        showCorrect && "border-white/40 bg-white/15 text-white",
                        showWrong && "border-white/30 bg-black/15 text-white",
                        submitted && !showCorrect && !showWrong && "border-white/15 bg-white/5 text-white/90"
                      )}
                    >
                      <input
                        id={id}
                        type="radio"
                        name={q.id}
                        value={c.key}
                        className={cn("mt-0.5 size-4 shrink-0", submitted ? "accent-white" : "accent-primary")}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() => setAnswer(q.id, c.key)}
                      />
                      <span className="min-w-0 flex-1 leading-snug">
                        <span className={cn("font-semibold", submitted ? "text-white" : "text-foreground")}>
                          {c.key}.
                        </span>{" "}
                        <InlineMarkdown content={c.text} className="inline text-inherit" inline />
                      </span>
                    </label>
                  );
                })}
              </fieldset>
              {submitted ? (
                <div className="mt-4 rounded-xl border border-white/20 bg-black/10 p-3 text-small text-white">
                  <p className="font-medium text-white">
                    Bonne réponse : {q.correctKey}.{" "}
                    <InlineMarkdown
                      content={q.choices.find((choice) => choice.key === q.correctKey)?.text ?? ""}
                      className="inline text-inherit"
                      inline
                    />
                  </p>
                  <InlineMarkdown content={q.explanation} className="mt-1 text-muted-foreground" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {!submitted ? (
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" size="lg" onClick={handleSubmit}>
            Terminer et voir le score
          </Button>
          <span className="text-small text-muted-foreground">
            {visibleItems.filter((q) => answers[q.id]).length} / {visibleItems.length} questions avec une réponse
          </span>
        </div>
      ) : null}
    </div>
  );
}
