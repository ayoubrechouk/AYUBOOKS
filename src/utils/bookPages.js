const startMarker = /\*{3}\s*START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\*{3}/i;
const endMarker = /\*{3}\s*END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[\s\S]*$/i;

function extractBookBody(rawText) {
  const text = rawText.replace(/\r\n?/g, "\n").replace(/\f/g, "\n");
  const start = startMarker.exec(text);
  if (!start) {
    throw new Error("The book text is missing its Project Gutenberg start marker.");
  }

  const bodyStart = start.index + start[0].length;
  const end = endMarker.exec(text.slice(bodyStart));
  const bodyEnd = end ? bodyStart + end.index : text.length;
  const body = text.slice(bodyStart, bodyEnd).trim();

  if (!body) {
    throw new Error("The book text contains no readable content.");
  }

  return body;
}

function splitLongParagraph(paragraph, wordLimit) {
  const words = paragraph.split(/\s+/);
  const chunks = [];

  while (words.length > wordLimit) {
    chunks.push(words.splice(0, wordLimit).join(" "));
  }
  if (words.length) {
    chunks.push(words.join(" "));
  }

  return chunks;
}

export function paginateBookText(rawText, wordsPerPage = 650) {
  const paragraphs = extractBookBody(rawText)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .flatMap((paragraph) => splitLongParagraph(paragraph, wordsPerPage));

  const pages = [];
  let pageParagraphs = [];
  let pageWordCount = 0;

  for (const paragraph of paragraphs) {
    const wordCount = paragraph.split(/\s+/).length;
    if (pageWordCount && pageWordCount + wordCount > wordsPerPage) {
      pages.push(pageParagraphs.join("\n\n"));
      pageParagraphs = [];
      pageWordCount = 0;
    }

    pageParagraphs.push(paragraph);
    pageWordCount += wordCount;
  }

  if (pageParagraphs.length) {
    pages.push(pageParagraphs.join("\n\n"));
  }

  return pages;
}
