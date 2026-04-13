import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  BookMarked,
  BookOpen,
  CircleHelp,
  ClipboardCheck,
  Code2,
  FlaskConical,
  GitBranch,
  Globe,
  Lightbulb,
  MessageSquareText,
  Shield,
} from "lucide-react";

const CHAPTER_ICONS: Record<string, LucideIcon> = {
  "01-introduction": Lightbulb,
  "02-securite-ia": Shield,
  "03-assistants-code-ide": Code2,
  "04-prompter-agents-markdown": MessageSquareText,
  "05-bmad-method": GitBranch,
  "06-produit-ia-apis": Blocks,
  "07-geo": Globe,
  "08-travaux-pratiques": FlaskConical,
  "09-synthese": BookMarked,
  "10-evaluation": ClipboardCheck,
  "11-banque-qcm": CircleHelp,
  "12-glossaire": BookOpen,
};

export function getTrainingChapterIcon(slug: string): LucideIcon {
  return CHAPTER_ICONS[slug] ?? BookOpen;
}
