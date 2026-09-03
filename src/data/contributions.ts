export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  /** what was actually happening that day — only ever present on the hand-authored experience calendar */
  note?: string;
  /** brand color for the square, overriding the default green scale — hand-authored calendar only */
  color?: string;
}

/** one row of the color key shown under a calendar that uses per-entry brand colors */
export interface ContributionLegendItem {
  label: string;
  color: string;
}

export interface ContributionCalendar {
  available: boolean;
  totalContributions: number;
  weeks: ContributionDay[][];
  /** when present, replaces the Less→More scale with a labeled color key */
  legend?: ContributionLegendItem[];
}

/** Same bucketing used by scripts/fetch-contributions.mjs — keep in sync. */
export function levelForCount(count: number): ContributionDay['level'] {
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

export const EMPTY_CALENDAR: ContributionCalendar = {
  available: false,
  totalContributions: 0,
  weeks: [],
};
