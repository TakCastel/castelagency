/**
 * Sur les lignes de citation Markdown (`>`), retire un deux-points éventuel
 * juste après **En bref** ou **Attention** (y compris sans espace avant `:`,
 * espaces insécables / fines).
 */
export function stripCalloutLabelColonInBlockquoteLines(markdown: string): string {
  return markdown
    .split("\n")
    .map((line) => {
      if (!/^\s{0,3}>/.test(line)) return line;
      return line.replace(
        /(\*\*(?:En bref|Attention)\*\*)\s*[:：]\s*/gi,
        "$1 "
      );
    })
    .join("\n");
}
