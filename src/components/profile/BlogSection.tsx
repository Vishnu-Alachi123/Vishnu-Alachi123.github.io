import { posts, formatPostDate } from '../../data/posts';
import ExpandableCard from './ExpandableCard';
import styles from './BlogSection.module.css';

/**
 * Renders posts from src/data/posts.json — add an entry there (title, date,
 * summary, body) and it appears here automatically, no component change
 * needed. Shows an honest empty state while that list is empty.
 */
export default function BlogSection() {
  if (posts.length === 0) {
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

  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <ExpandableCard
          key={post.id}
          anchorId={`blog-${post.id}`}
          summary={
            <div>
              <div className={styles.postTitle}>{post.title}</div>
              <div className={styles.postMeta}>{formatPostDate(post.date)}</div>
              <p className={styles.postSummary}>{post.summary}</p>
            </div>
          }
          detail={
            <div className={styles.postBody}>
              {post.body
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>
          }
        />
      ))}
    </div>
  );
}
