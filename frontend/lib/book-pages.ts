/**
 * Découpe un contenu Markdown en "pages" pour un rendu type A4.
 * Regroupe les blocs (paragraphes, titres ## ) jusqu'à ~charsPerPage caractères.
 */
const DEFAULT_CHARS_PER_PAGE = 2800;

/**
 * Regroupe des paragraphes en pages selon un nombre max de caractères par page.
 * Utilisé par BookReader (lecture par paragraphes).
 */
export function splitIntoPages(
  paragraphs: string[],
  charsPerPage: number
): string[][] {
  const pages: string[][] = [];
  let current: string[] = [];
  let currentLength = 0;

  for (const p of paragraphs) {
    const len = p.length + (currentLength > 0 ? 1 : 0);
    if (currentLength + len <= charsPerPage) {
      current.push(p);
      currentLength += len;
      continue;
    }
    if (current.length > 0) {
      pages.push(current);
      current = [];
      currentLength = 0;
    }
    if (p.length > charsPerPage) {
      pages.push([p]);
    } else {
      current.push(p);
      currentLength = p.length;
    }
  }
  if (current.length > 0) pages.push(current);
  return pages.length > 0 ? pages : [[]];
}

export function splitMarkdownIntoPages(
  content: string,
  charsPerPage: number = DEFAULT_CHARS_PER_PAGE
): string[] {
  const blocks = content.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  const pages: string[] = [];
  let currentPage = "";

  for (const block of blocks) {
    const withSeparator = currentPage ? "\n\n" + block : block;
    const wouldBe = currentPage.length + withSeparator.length;

    if (wouldBe <= charsPerPage) {
      currentPage += withSeparator;
      continue;
    }

    if (currentPage) {
      pages.push(currentPage);
      currentPage = "";
    }

    if (block.length > charsPerPage) {
      pages.push(block);
    } else {
      currentPage = block;
    }
  }

  if (currentPage) pages.push(currentPage);
  return pages;
}

const PAGE_BREAK_REGEX = /<hr\s+class="page-break"\s*\/?>\s*/gi;

const DEFAULT_HTML_CHARS_PER_PAGE = 3200;

const HTML_BLOCK_END = /(<\/p>|<\/h[1-6]>|<\/blockquote>|<\/li>)/gi;

/**
 * Découpe un contenu HTML en blocs (chaque bloc se termine par </p>, </h2>, etc.).
 * Puis regroupe les blocs jusqu'à ~charsPerPage pour former des pages.
 */
function splitHtmlBySize(html: string, charsPerPage: number): string[] {
  const tokens = html.split(HTML_BLOCK_END);
  const blocks: string[] = [];
  for (let i = 0; i < tokens.length - 1; i += 2) {
    const block = tokens[i] + (tokens[i + 1] ?? "");
    if (block.trim()) blocks.push(block.trim());
  }
  if (tokens.length % 2 === 1 && tokens[tokens.length - 1]?.trim()) {
    blocks.push(tokens[tokens.length - 1].trim());
  }
  if (blocks.length === 0) return [html];

  const pages: string[] = [];
  let current = "";
  for (const block of blocks) {
    const withBlock = current ? current + block : block;
    if (withBlock.length <= charsPerPage) {
      current = withBlock;
      continue;
    }
    if (current) {
      pages.push(current);
      current = "";
    }
    if (block.length > charsPerPage) {
      pages.push(block);
    } else {
      current = block;
    }
  }
  if (current) pages.push(current);
  return pages.length > 0 ? pages : [html];
}

/**
 * Découpe un contenu HTML en "pages" selon les <hr class="page-break" />.
 * S'il n'y a aucun saut de page, découpe par taille (~1 page A4).
 */
export function splitHtmlIntoPages(
  html: string,
  charsPerPage: number = DEFAULT_HTML_CHARS_PER_PAGE
): string[] {
  const trimmed = html.trim();
  if (!trimmed) return [""];
  const byBreak = trimmed.split(PAGE_BREAK_REGEX).map((p) => p.trim()).filter(Boolean);
  if (byBreak.length > 1) return byBreak;
  return splitHtmlBySize(trimmed, charsPerPage);
}
