import raw from './posts.json';

export interface Post {
  /** unique, url-safe — used for the #blog-<id> deep link */
  id: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  /** plain text; blank lines separate paragraphs */
  body: string;
}

export const posts: Post[] = (raw as Post[])
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first

export function formatPostDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
