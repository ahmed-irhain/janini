/** Small first-party parser for the subset of Markdown used to author article
 * bodies (`articles.body_ar`): headings, paragraphs, unordered/ordered lists,
 * blockquote callouts, and inline bold/italic. Deliberately not a full
 * CommonMark implementation — no third-party RN markdown renderer is
 * maintained/New-Architecture-safe enough to justify the dependency for this
 * app's small, fixed set of editorial needs. */

export interface MarkdownSpan {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export type MarkdownBlock =
  | { type: "heading"; spans: MarkdownSpan[] }
  | { type: "paragraph"; spans: MarkdownSpan[] }
  | { type: "list"; ordered: boolean; items: MarkdownSpan[][] }
  | { type: "quote"; spans: MarkdownSpan[] };

const HEADING_RE = /^#{1,6}\s+(.*)$/;
const QUOTE_RE = /^>\s?(.*)$/;
const UNORDERED_RE = /^[-*]\s+(.*)$/;
const ORDERED_RE = /^\d+\.\s+(.*)$/;
const INLINE_RE = /\*\*(.+?)\*\*|\*(.+?)\*/g;

function parseInline(text: string): MarkdownSpan[] {
  const spans: MarkdownSpan[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  INLINE_RE.lastIndex = 0;
  while ((match = INLINE_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      spans.push({ text: text.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      spans.push({ text: match[1], bold: true });
    } else if (match[2] !== undefined) {
      spans.push({ text: match[2], italic: true });
    }
    lastIndex = INLINE_RE.lastIndex;
  }
  if (lastIndex < text.length) {
    spans.push({ text: text.slice(lastIndex) });
  }
  return spans.length > 0 ? spans : [{ text }];
}

export function parseMarkdown(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];

  let paragraphLines: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;
  let quoteLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({ type: "paragraph", spans: parseInline(paragraphLines.join(" ")) });
      paragraphLines = [];
    }
  };
  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", ordered: listOrdered, items: listItems.map(parseInline) });
      listItems = [];
    }
  };
  const flushQuote = () => {
    if (quoteLines.length > 0) {
      blocks.push({ type: "quote", spans: parseInline(quoteLines.join(" ")) });
      quoteLines = [];
    }
  };

  for (const rawLine of markdown.replace(/\r\n/g, "\n").split("\n")) {
    const line = rawLine.trim();

    if (line === "") {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    const heading = line.match(HEADING_RE);
    if (heading) {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push({ type: "heading", spans: parseInline(heading[1].trim()) });
      continue;
    }

    const quote = line.match(QUOTE_RE);
    if (quote) {
      flushParagraph();
      flushList();
      quoteLines.push(quote[1]);
      continue;
    }
    flushQuote();

    const unordered = line.match(UNORDERED_RE);
    if (unordered) {
      flushParagraph();
      if (listItems.length > 0 && listOrdered) flushList();
      listOrdered = false;
      listItems.push(unordered[1]);
      continue;
    }

    const ordered = line.match(ORDERED_RE);
    if (ordered) {
      flushParagraph();
      if (listItems.length > 0 && !listOrdered) flushList();
      listOrdered = true;
      listItems.push(ordered[1]);
      continue;
    }
    flushList();

    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();
  flushQuote();

  return blocks;
}
