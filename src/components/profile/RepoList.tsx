import { repoCards } from '../../data/githubProfile';
import type { ProfileSettings } from '../../hooks/useProfileSettings';
import RepoCard, { REPO_ICON, RepoSummary } from './RepoCard';
import styles from './RepoList.module.css';

type Props = { settings: ProfileSettings };

export default function RepoList({ settings }: Props) {
  const byId = new Map(repoCards.map((r) => [r.id, r]));
  const ordered = settings.repoOrder.map((id) => byId.get(id)).filter((r): r is (typeof repoCards)[number] => !!r);
  const pinned = ordered.filter((r) => settings.pinnedRepoIds.includes(r.id));

  return (
    <div>
      {pinned.length > 0 && (
        <div className={styles.pinnedGrid}>
          {pinned.map((repo) => (
            <a key={repo.id} href={`#profile-repo-${repo.id}`} className={styles.pinnedCard}>
              <div className={styles.pinnedHead}>
                <span className={styles.pinnedIcon}>{REPO_ICON}</span>
                <span className={styles.pinnedName}>{repo.name}</span>
              </div>
              <p className={styles.pinnedDesc}>{repo.summary}</p>
              <div className={styles.pinnedMeta}>
                <span className={styles.langMeta}>
                  <span className={styles.langDot} style={{ background: repo.languageColor }} />
                  {repo.language}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className={styles.list}>
        {ordered.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

// re-exported so SettingsPanel can render a lightweight repo summary row for pin/reorder controls
export { RepoSummary };
