import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './ExpandableCard.module.css';

type Props = {
  /** unique, stable id used for the url hash deep link, e.g. "profile-repo-findr" */
  anchorId: string;
  summary: ReactNode;
  detail: ReactNode;
  /** true when rendered outside a connected list (adjusts border radius) */
  standalone?: boolean;
};

/**
 * Shared expand-in-place primitive for repo and experience cards. Supports a
 * shareable deep link: visiting the page with #<anchorId> in the URL
 * auto-expands and scrolls to that card, standing in for "navigate to a
 * detail page" without introducing a router (see PLAN.md).
 */
export default function ExpandableCard({ anchorId, summary, detail, standalone }: Props) {
  const [open, setOpen] = useState(false);
  const [targeted, setTargeted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === `#${anchorId}`) {
        setOpen(true);
        setTargeted(true);
        requestAnimationFrame(() => ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }));
      }
    };
    checkHash(); // initial load / direct link
    window.addEventListener('hashchange', checkHash); // pinned-card jump links while already on the page
    return () => window.removeEventListener('hashchange', checkHash);
  }, [anchorId]);

  const detailId = `${anchorId}-detail`;

  return (
    <div
      ref={ref}
      id={anchorId}
      className={`${styles.card} ${standalone ? styles.standalone : ''} ${targeted ? styles.targeted : ''}`}
    >
      <button
        type="button"
        className={styles.summaryBtn}
        aria-expanded={open}
        aria-controls={detailId}
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          className={`${styles.chevron} ${open ? styles.open : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
        </svg>
        <span className={styles.summaryContent}>{summary}</span>
      </button>
      {open && (
        <div id={detailId} role="region" className={styles.detail}>
          {detail}
        </div>
      )}
    </div>
  );
}
