import type { ContributionCalendar, ContributionDay, ContributionLegendItem } from './contributions';
import rawLog from './experienceLog.json';

export interface ExperienceLogEntry {
  /** YYYY-MM-DD */
  from: string;
  /** YYYY-MM-DD, or "present" to mean "through today" */
  to: string;
  level: 0 | 1 | 2 | 3 | 4;
  note: string;
  /** defaults to false; set true for work entries so weekends stay blank */
  weekdaysOnly?: boolean;
  /** hex brand color for this stretch's squares — e.g. Oracle red, Cal Poly green */
  color?: string;
  /** short name for the color key under the graph, e.g. "Oracle" */
  label?: string;
}

const log = rawLog as ExperienceLogEntry[];

function parseDate(s: string): Date {
  return new Date(s + 'T00:00:00');
}

function toDateOrToday(s: string): Date {
  if (s === 'present') return new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00');
  return parseDate(s);
}

/**
 * Builds a 53-week ContributionCalendar (same shape/window as the real
 * GitHub graph) from the hand-editable src/data/experienceLog.json.
 * Recomputed at render time against the actual current date, so it never
 * goes stale the way a pre-generated file would.
 *
 * To add or update an entry: edit experienceLog.json — no code change,
 * no build step. See README.md.
 */
export function buildExperienceCalendar(weeks = 53): ContributionCalendar {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const end = new Date(today);
  while (end.getDay() !== 6) end.setDate(end.getDate() + 1); // upcoming Saturday
  const start = new Date(end);
  start.setDate(start.getDate() - (weeks * 7 - 1));
  while (start.getDay() !== 0) start.setDate(start.getDate() - 1); // preceding Sunday

  const entries = log.map((e) => ({
    ...e,
    fromDate: parseDate(e.from),
    toDate: toDateOrToday(e.to),
  }));

  const resultWeeks: ContributionDay[][] = [];
  let total = 0;
  const cursor = new Date(start);

  while (cursor <= end) {
    const week: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = cursor.toISOString().slice(0, 10);
      const isWeekday = cursor.getDay() >= 1 && cursor.getDay() <= 5;
      const inFuture = cursor > today;

      let level: ContributionDay['level'] = 0;
      let note: string | undefined;
      let color: string | undefined;

      if (!inFuture) {
        for (const e of entries) {
          if (cursor < e.fromDate || cursor > e.toDate) continue;
          if (e.weekdaysOnly && !isWeekday) continue;
          level = e.level; // later entries win on overlap
          note = e.note;
          color = e.color;
        }
      }

      const count = level * 2;
      total += count;
      week.push({ date: dateStr, count, level, note, color });
      cursor.setDate(cursor.getDate() + 1);
    }
    resultWeeks.push(week);
  }

  return { available: true, totalContributions: total, weeks: resultWeeks, legend: buildLegend() };
}

/**
 * One row per distinct label/color pair in the log, in the order they first
 * appear — so adding a colored entry to experienceLog.json also adds it to
 * the key under the graph, with no component change.
 */
function buildLegend(): ContributionLegendItem[] | undefined {
  const seen = new Map<string, ContributionLegendItem>();
  for (const e of log) {
    if (!e.color || !e.label) continue;
    const key = `${e.label}|${e.color}`;
    if (!seen.has(key)) seen.set(key, { label: e.label, color: e.color });
  }
  return seen.size > 0 ? [...seen.values()] : undefined;
}
