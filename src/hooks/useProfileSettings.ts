import { useCallback, useEffect, useState } from 'react';
import { repoCards } from '../data/githubProfile';

export type Theme = 'dark' | 'light';

export interface ProfileSettings {
  theme: Theme;
  pinnedRepoIds: string[];
  repoOrder: string[];
}

const STORAGE_KEY = 'profile_settings_v1';
const ALL_REPO_IDS = repoCards.map((r) => r.id);
const DEFAULT_PINNED = repoCards.filter((r) => r.pinned).map((r) => r.id);

const DEFAULTS: ProfileSettings = {
  theme: 'dark',
  pinnedRepoIds: DEFAULT_PINNED,
  repoOrder: ALL_REPO_IDS,
};

function load(): ProfileSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<ProfileSettings>;
    return {
      theme: parsed.theme === 'light' ? 'light' : 'dark',
      pinnedRepoIds: Array.isArray(parsed.pinnedRepoIds) ? parsed.pinnedRepoIds : DEFAULT_PINNED,
      // guard against stale ids from a previous project list
      repoOrder: Array.isArray(parsed.repoOrder)
        ? [...parsed.repoOrder.filter((id) => ALL_REPO_IDS.includes(id)), ...ALL_REPO_IDS.filter((id) => !parsed.repoOrder!.includes(id))]
        : ALL_REPO_IDS,
    };
  } catch {
    return DEFAULTS;
  }
}

/**
 * Small, localStorage-backed settings for the GitHub-style profile page:
 * theme, which repos are pinned, and their display order. Applies the theme
 * to the document root as a side effect so plain CSS variables handle the
 * rest (no theme context/provider needed).
 */
export function useProfileSettings() {
  const [settings, setSettings] = useState<ProfileSettings>(load);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage may be unavailable (private browsing, quota) — theme still applies for this session */
    }
  }, [settings]);

  const setTheme = useCallback((theme: Theme) => {
    setSettings((s) => ({ ...s, theme }));
  }, []);

  const togglePin = useCallback((id: string) => {
    setSettings((s) => ({
      ...s,
      pinnedRepoIds: s.pinnedRepoIds.includes(id)
        ? s.pinnedRepoIds.filter((x) => x !== id)
        : [...s.pinnedRepoIds, id],
    }));
  }, []);

  const moveRepo = useCallback((id: string, direction: -1 | 1) => {
    setSettings((s) => {
      const order = [...s.repoOrder];
      const i = order.indexOf(id);
      const j = i + direction;
      if (i < 0 || j < 0 || j >= order.length) return s;
      [order[i], order[j]] = [order[j], order[i]];
      return { ...s, repoOrder: order };
    });
  }, []);

  return { settings, setTheme, togglePin, moveRepo };
}
