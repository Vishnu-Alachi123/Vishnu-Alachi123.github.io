import { useState } from 'react';
import { useRepoCount } from '../../hooks/useRepoCount';
import { useResume } from '../../hooks/useResume';
import { repoCards } from '../../data/githubProfile';
import styles from './ProfileHeader.module.css';

const GITHUB_USER = 'Vishnu-Alachi123';
const AVATAR_URL = `https://github.com/${GITHUB_USER}.png`;

const ICONS = {
  location: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M11.536 3.464a5 5 0 0 1 0 7.072L8 14.07l-3.536-3.535a5 5 0 1 1 7.072-7.07ZM8 15.5s6-5.5 6-9.5A6 6 0 1 0 2 6c0 4 6 9.5 6 9.5Zm0-7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
    </svg>
  ),
  link: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95Zm-4.55 9.45a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0Z" />
    </svg>
  ),
  mail: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 4.07v8.18c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V4.07l-6.24 4.313a.75.75 0 0 1-.87 0Z" />
    </svg>
  ),
  org: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.5 14.25V1.75A.75.75 0 0 1 2.25 1h6.5a.75.75 0 0 1 .75.75v3.5h3.25a.75.75 0 0 1 .75.75v8.25a.75.75 0 0 1-.75.75h-11a.75.75 0 0 1-.75-.75Zm1.5-.75h9.5V6.5H9a.75.75 0 0 1-.75-.75V2.5H3v11ZM4.5 4h1v1h-1Zm0 2.5h1v1h-1ZM4.5 9h1v1h-1Zm0 2.5h1v1h-1ZM7 9h1v1H7Zm0 2.5h1v1H7Zm3 0h1v1h-1Z" />
    </svg>
  ),
  gear: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0a8.2 8.2 0 0 1 1.573.16.75.75 0 0 1 .58.58l.284 1.42a1.2 1.2 0 0 0 1.65.85l1.3-.6a.75.75 0 0 1 .82.16 8 8 0 0 1 1.6 1.98.75.75 0 0 1-.09.84l-.94 1.11a1.2 1.2 0 0 0 0 1.5l.94 1.11a.75.75 0 0 1 .09.84 8 8 0 0 1-1.6 1.98.75.75 0 0 1-.82.16l-1.3-.6a1.2 1.2 0 0 0-1.65.85l-.284 1.42a.75.75 0 0 1-.58.58 8.2 8.2 0 0 1-3.146 0 .75.75 0 0 1-.58-.58l-.284-1.42a1.2 1.2 0 0 0-1.65-.85l-1.3.6a.75.75 0 0 1-.82-.16 8 8 0 0 1-1.6-1.98.75.75 0 0 1 .09-.84l.94-1.11a1.2 1.2 0 0 0 0-1.5l-.94-1.11a.75.75 0 0 1-.09-.84 8 8 0 0 1 1.6-1.98.75.75 0 0 1 .82-.16l1.3.6a1.2 1.2 0 0 0 1.65-.85l.284-1.42a.75.75 0 0 1 .58-.58A8.2 8.2 0 0 1 8 0Zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  ),
};

export default function ProfileHeader({ onOpenSettings }: { onOpenSettings: () => void }) {
  const repoCount = useRepoCount(repoCards.length);
  const { profile, roles } = useResume();
  const [avatarFailed, setAvatarFailed] = useState(false);

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className={styles.header}>
      <div className={styles.avatarWrap}>
        {avatarFailed ? (
          <div className={styles.avatarFallback}>{initials}</div>
        ) : (
          <img
            className={styles.avatar}
            src={AVATAR_URL}
            alt={profile.name}
            onError={() => setAvatarFailed(true)}
          />
        )}
      </div>

      <span className={styles.eyebrow}>Personal portfolio</span>

      <div className={styles.nameRow}>
        <div className={styles.name}>
          {profile.name} <span className={styles.handle}>{GITHUB_USER}</span>
        </div>
        <div className={styles.role}>{profile.role}</div>
      </div>

      <p className={styles.bio}>
        I&apos;m a software engineer who likes building things that actually get used — right now
        that&apos;s an AI operations agent running in production at Oracle, and Findr, a campus
        discovery app I run end to end. I care about taking ambiguous, real-world problems and
        turning them into software that&apos;s reliable and genuinely useful, and I get restless if
        I&apos;m not making something. Outside of code I play basketball and soccer, draw, and take
        apart anything mechanical I can get my hands on. Graduating {profile.graduation}, {profile.seeking.toLowerCase()}.
      </p>

      <div className={styles.actions}>
        <a href="/Vishnu_Alachi_resume.pdf" download className="btn btn-primary">
          Download resume
        </a>
        <button type="button" className={`btn ${styles.settingsBtn}`} onClick={onOpenSettings} aria-label="Customize profile">
          {ICONS.gear}
        </button>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{repoCount}</div>
          <div className={styles.statLabel}>Public repos</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{repoCards.length}</div>
          <div className={styles.statLabel}>Projects</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{roles.length}</div>
          <div className={styles.statLabel}>Positions held</div>
        </div>
      </div>

      <ul className={styles.metaList}>
        <li>
          {ICONS.org}
          <a href="https://www.calpoly.edu" target="_blank" rel="noopener noreferrer">
            Cal Poly, San Luis Obispo
          </a>
        </li>
        <li>
          {ICONS.location}
          San Luis Obispo, CA
        </li>
        <li>
          {ICONS.link}
          <a href="https://findr.page" target="_blank" rel="noopener noreferrer">
            findr.page
          </a>
        </li>
        <li>
          {ICONS.mail}
          <a href="mailto:vishnualachi@gmail.com">vishnualachi@gmail.com</a>
        </li>
      </ul>
    </div>
  );
}
