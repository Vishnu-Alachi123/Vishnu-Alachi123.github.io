import { useEffect } from 'react';
import { repoCards } from '../../data/githubProfile';
import type { Theme, ProfileSettings } from '../../hooks/useProfileSettings';
import styles from './SettingsPanel.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  settings: ProfileSettings;
  setTheme: (t: Theme) => void;
  togglePin: (id: string) => void;
  moveRepo: (id: string, direction: -1 | 1) => void;
};

export default function SettingsPanel({ open, onClose, settings, setTheme, togglePin, moveRepo }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const byId = new Map(repoCards.map((r) => [r.id, r]));
  const ordered = settings.repoOrder.map((id) => byId.get(id)).filter((r): r is (typeof repoCards)[number] => !!r);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Customize profile">
        <div className={styles.head}>
          <h2>Customize how this profile displays</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.group}>
            <h3>Appearance</h3>
            <div className={styles.themeRow}>
              <button
                type="button"
                className={`btn ${styles.themeBtn} ${settings.theme === 'dark' ? styles.active : ''}`}
                onClick={() => setTheme('dark')}
              >
                Dark
              </button>
              <button
                type="button"
                className={`btn ${styles.themeBtn} ${settings.theme === 'light' ? styles.active : ''}`}
                onClick={() => setTheme('light')}
              >
                Light
              </button>
            </div>
          </div>

          <div className={styles.group}>
            <h3>Pinned repositories &amp; order</h3>
            {ordered.map((repo, i) => (
              <div key={repo.id} className={styles.repoRow}>
                <button
                  type="button"
                  className={`${styles.iconBtn} ${settings.pinnedRepoIds.includes(repo.id) ? styles.pinned : ''}`}
                  onClick={() => togglePin(repo.id)}
                  aria-pressed={settings.pinnedRepoIds.includes(repo.id)}
                  aria-label={`${settings.pinnedRepoIds.includes(repo.id) ? 'Unpin' : 'Pin'} ${repo.name}`}
                  title={settings.pinnedRepoIds.includes(repo.id) ? 'Unpin' : 'Pin'}
                >
                  ★
                </button>
                <span className={styles.repoName}>{repo.name}</span>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => moveRepo(repo.id, -1)}
                  disabled={i === 0}
                  aria-label={`Move ${repo.name} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => moveRepo(repo.id, 1)}
                  disabled={i === ordered.length - 1}
                  aria-label={`Move ${repo.name} down`}
                >
                  ↓
                </button>
              </div>
            ))}
            <p className={styles.hint}>Pinned repos show in the featured grid above the full list.</p>
          </div>
        </div>
      </div>
    </>
  );
}
