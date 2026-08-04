import styles from './BlogSection.module.css';

/**
 * Placeholder — no posts yet. Kept as its own section/component so real
 * posts can replace this without touching ProfilePage's layout.
 */
export default function BlogSection() {
  return (
    <div className={styles.empty}>
      <svg
        className={styles.icon}
        width="28"
        height="28"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z" />
      </svg>
      <div className={styles.title}>Nothing published yet</div>
      <p className={styles.body}>
        I&apos;m planning to write here about what I&apos;m building and learning — Findr, AI agents,
        and whatever I break along the way. Check back soon.
      </p>
    </div>
  );
}
