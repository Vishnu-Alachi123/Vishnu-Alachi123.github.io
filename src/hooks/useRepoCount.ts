import { useEffect, useState } from 'react';

const CACHE_KEY = 'gh_repo_count_v1';
const TTL = 3600e3; // 1 hour
const USER = 'Vishnu-Alachi123';

/**
 * Live public-repo count from the GitHub API, cached in localStorage for an
 * hour. Falls back to `fallback` while loading or if the request fails.
 */
export function useRepoCount(fallback: number): number {
  const [count, setCount] = useState(fallback);

  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null') as
        | { at: number; count: number }
        | null;
      if (cached && Date.now() - cached.at < TTL && typeof cached.count === 'number') {
        setCount(cached.count);
        return;
      }
    } catch {
      /* ignore malformed cache */
    }

    let active = true;
    fetch(`https://api.github.com/users/${USER}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((user: { public_repos?: number }) => {
        if (!active || typeof user.public_repos !== 'number') return;
        setCount(user.public_repos);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), count: user.public_repos }));
        } catch {
          /* storage may be unavailable */
        }
      })
      .catch(() => {
        /* keep fallback */
      });

    return () => {
      active = false;
    };
  }, []);

  return count;
}
