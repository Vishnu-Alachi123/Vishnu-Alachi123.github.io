import type { RepoCardData } from '../../data/githubProfile';
import ExpandableCard from './ExpandableCard';
import styles from './RepoList.module.css';

const REPO_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
  </svg>
);

export function RepoSummary({ repo }: { repo: RepoCardData }) {
  return (
    <div className={styles.repoRow}>
      <div className={styles.repoTop}>
        <span className={styles.repoName}>{repo.name}</span>
        <span className={styles.visibility}>{repo.statusLabel}</span>
      </div>
      <p className={styles.repoDesc}>{repo.summary}</p>
      <div className={styles.repoMeta}>
        <span className={styles.langMeta}>
          <span className={styles.langDot} style={{ background: repo.languageColor }} />
          {repo.language}
        </span>
        {repo.homepage && <span>🔗 {repo.homepage.replace(/^https?:\/\//, '')}</span>}
      </div>
    </div>
  );
}

export function RepoDetail({ repo }: { repo: RepoCardData }) {
  return (
    <div className={styles.repoDetail}>
      <div>{repo.detail}</div>
      {repo.topics.length > 0 && (
        <div className={`tags ${styles.repoTags}`}>
          {repo.topics.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      )}
      {repo.links.length > 0 && (
        <div className={styles.repoLinks}>
          {repo.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      )}
      {repo.note && <p className={styles.repoNote}>{repo.note}</p>}
    </div>
  );
}

export default function RepoCard({ repo }: { repo: RepoCardData }) {
  return (
    <ExpandableCard
      anchorId={`profile-repo-${repo.id}`}
      summary={<RepoSummary repo={repo} />}
      detail={<RepoDetail repo={repo} />}
    />
  );
}

export { REPO_ICON };
