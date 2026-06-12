import { Article } from "./articles";

const WORDS_PER_MINUTE = 200; // Average reading speed

export function calculateReadingTime(article: Article): number {
  // Count words in summary
  const summaryWords = article.summary.split(/\s+/).length;

  // Count words in all section content
  const sectionsWords = article.sections.reduce((total, section) => {
    const contentWords = section.content.reduce((sectionTotal, paragraph) => {
      return sectionTotal + paragraph.split(/\s+/).length;
    }, 0);
    return total + contentWords;
  }, 0);

  const totalWords = summaryWords + sectionsWords;
  const readingTimeMinutes = Math.ceil(totalWords / WORDS_PER_MINUTE);

  return readingTimeMinutes;
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return "< 1 min read";
  }
  return `${minutes} min read`;
}
