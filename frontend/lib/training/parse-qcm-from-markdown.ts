export type QuizChoiceKey = "A" | "B" | "C" | "D";

export type TrainingQuizModuleId = "assistants" | "bmad" | "geo" | "security";

export type TrainingQuizItem = {
  id: string;
  moduleId: TrainingQuizModuleId;
  prompt: string;
  choices: { key: QuizChoiceKey; text: string }[];
  correctKey: QuizChoiceKey;
  explanation: string;
};

const CHOICE_LINE = /^-\s*\*\*([A-D])\)\*\*\s*(.+)$/;

function moduleFromQuestionId(id: string): TrainingQuizModuleId {
  if (id.startsWith("C")) return "assistants";
  if (id.startsWith("B")) return "bmad";
  if (id.startsWith("G")) return "geo";
  if (id.startsWith("S")) return "security";
  return "assistants";
}

function parseAnswerTable(md: string): Map<string, QuizChoiceKey> {
  const map = new Map<string, QuizChoiceKey>();
  const idx = md.indexOf("### Tableau récapitulatif des bonnes réponses");
  if (idx < 0) return map;
  const tableBlock = md.slice(idx);
  for (const line of tableBlock.split("\n")) {
    const m = /^\|\s*([CBGS]\d+)\s*\|\s*([A-D])\s*\|/.exec(line.trim());
    if (m) {
      map.set(m[1], m[2] as QuizChoiceKey);
    }
  }
  return map;
}

function parseAnswerExplanations(md: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const line of md.split("\n")) {
    const m = /^-\s+\*\*([CBGS]\d+)\s*:\s*[A-D]\*\*\s*:\s*(.+)$/.exec(line.trim());
    if (m) {
      map.set(m[1], m[2].trim());
    }
  }
  return map;
}

/**
 * Extrait les 32 questions et les bonnes réponses depuis le Markdown du chapitre 11.
 */
export function parseQcmFromMarkdown(markdown: string): TrainingQuizItem[] {
  const answers = parseAnswerTable(markdown);
  const explanations = parseAnswerExplanations(markdown);
  const items: TrainingQuizItem[] = [];

  const parts = markdown.split(/^### Question\s+([CBGS]\d+)\s*$/m);
  for (let i = 1; i < parts.length; i += 2) {
    const id = parts[i]?.trim();
    const body = parts[i + 1];
    if (!id || !body) continue;

    const lines = body.split("\n");
    const firstChoiceIdx = lines.findIndex((l) => CHOICE_LINE.test(l.trim()));
    if (firstChoiceIdx < 0) continue;

    const prompt = lines.slice(0, firstChoiceIdx).join("\n").trim();
    const choices: { key: QuizChoiceKey; text: string }[] = [];

    for (let j = firstChoiceIdx; j < lines.length; j++) {
      const trimmed = lines[j].trim();
      if (trimmed.startsWith("### ")) break;
      const m = CHOICE_LINE.exec(trimmed);
      if (m) {
        choices.push({ key: m[1] as QuizChoiceKey, text: m[2].trim() });
      }
    }

    const correctKey = answers.get(id);
    const explanation = explanations.get(id);
    if (!correctKey || !explanation || choices.length !== 4) continue;

    items.push({
      id,
      moduleId: moduleFromQuestionId(id),
      prompt,
      choices,
      correctKey,
      explanation,
    });
  }

  return items;
}
