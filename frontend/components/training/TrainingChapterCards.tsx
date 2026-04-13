import Link from "next/link";
import { Clock } from "lucide-react";

import type { TrainingChapterMeta } from "@/lib/training/course";
import { getTrainingChapterIcon } from "@/lib/training/chapter-icons";
import { cn } from "@/lib/utils";

type TrainingChapterCardsProps = {
  chapters: TrainingChapterMeta[];
  className?: string;
};

export function TrainingChapterCards({ chapters, className }: TrainingChapterCardsProps) {
  return (
    <ul className={cn("flex flex-col gap-5 sm:gap-6", className)}>
      {chapters.map((c) => {
        const Icon = getTrainingChapterIcon(c.slug);
        return (
          <li key={c.slug}>
            <Link
              href={`/formation-ia/chapitre/${c.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-border/80 bg-card/60 p-5 shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-px hover:border-primary/40 hover:shadow-md sm:gap-5 sm:p-6"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-14 sm:w-14"
                aria-hidden
              >
                <Icon className="size-5 sm:size-6" strokeWidth={1.75} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-2 pt-0.5 sm:gap-2.5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-small font-medium text-muted-foreground">Chapitre {c.number}</span>
                  <span className="flex shrink-0 items-center gap-1.5 text-small tabular-nums text-muted-foreground">
                    <Clock className="size-3.5 shrink-0 opacity-80" aria-hidden />
                    {c.durationLabel}
                  </span>
                </div>
                <h3 className="text-pretty text-titre-petit font-semibold leading-snug text-foreground group-hover:text-primary">
                  {c.title}
                </h3>
                <p className="text-pretty text-small leading-relaxed text-muted-foreground sm:text-[15px]">
                  {c.cardDescription}
                </p>
                <p className="text-pretty text-small leading-relaxed text-foreground/80 sm:text-[15px]">
                  {c.cardDetails}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
