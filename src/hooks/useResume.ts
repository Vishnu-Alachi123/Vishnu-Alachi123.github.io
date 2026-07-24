import { useEffect, useState } from 'react';
import { defaultResume, type ResumeData } from '../data/resume';

// Single source of truth on GitHub. Editing this file on the default branch
// updates the live site (raw serves it immediately; a redeploy refreshes the
// bundled fallback too).
const RAW_URL =
  'https://raw.githubusercontent.com/Vishnu-Alachi123/Vishnu-Alachi123.github.io/main/src/data/resume.json';

function isResume(v: unknown): v is ResumeData {
  if (!v || typeof v !== 'object') return false;
  const r = v as Partial<ResumeData>;
  return (
    !!r.profile &&
    Array.isArray(r.roles) &&
    Array.isArray(r.skills) &&
    Array.isArray(r.certifications) &&
    Array.isArray(r.currentlyLearning)
  );
}

/**
 * Returns résumé content, preferring the live copy fetched from GitHub so the
 * page reflects edits without a code change. Falls back to the bundled copy
 * while loading or if the fetch fails.
 */
export function useResume(): ResumeData {
  const [data, setData] = useState<ResumeData>(defaultResume);

  useEffect(() => {
    let active = true;
    fetch(RAW_URL, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json: unknown) => {
        if (active && isResume(json)) setData(json);
      })
      .catch(() => {
        /* keep bundled fallback */
      });
    return () => {
      active = false;
    };
  }, []);

  return data;
}
