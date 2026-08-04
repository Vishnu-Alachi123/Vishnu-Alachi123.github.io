/**
 * Approximates GitHub's language-color dots (github-linguist palette) for
 * the tags already used in src/data/projects.tsx. Falls back to a neutral
 * gray for anything unmapped rather than guessing.
 */
const COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'React Native': '#61dafb',
  'Full-stack': '#8250df',
  Product: '#8250df',
  'UI/UX': '#bf5af2',
  MCP: '#58a6ff',
  Automation: '#58a6ff',
  'AI Agents': '#58a6ff',
  'Machine Learning': '#dea584',
  'Computer Vision': '#dea584',
  Robotics: '#dea584',
  'Monte Carlo': '#3572A5',
  'Game AI': '#3572A5',
  MongoDB: '#4FAA41',
  'Speech-to-Text': '#f1e05a',
  Productivity: '#f1e05a',
  'ADHD-friendly': '#f1e05a',
};

const FALLBACK = '#8b949e';

export function languageColor(tag: string): string {
  return COLORS[tag] ?? FALLBACK;
}
