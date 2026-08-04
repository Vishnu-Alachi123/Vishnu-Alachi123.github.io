import { useEffect, useState } from 'react';
import { EMPTY_CALENDAR, type ContributionCalendar } from '../data/contributions';

/**
 * Fetches the pre-generated, build-time GitHub contribution calendar
 * (public/data/contributions-real.json — see scripts/fetch-contributions.mjs
 * and .github/workflows/contributions.yml). No client-side token, no live
 * API call, no rate-limit exposure — just a static same-origin file.
 */
export function useGithubContributions(): ContributionCalendar {
  const [calendar, setCalendar] = useState<ContributionCalendar>(EMPTY_CALENDAR);

  useEffect(() => {
    let active = true;
    fetch('/data/contributions-real.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: ContributionCalendar) => {
        if (active && data && typeof data.available === 'boolean') setCalendar(data);
      })
      .catch(() => {
        /* keep EMPTY_CALENDAR — component renders the "not synced" state */
      });
    return () => {
      active = false;
    };
  }, []);

  return calendar;
}
