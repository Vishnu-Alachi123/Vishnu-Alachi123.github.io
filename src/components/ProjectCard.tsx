import type { Project } from '../data/projects';
import ProjectGraphic from './ProjectGraphic';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }: { project: Project }) {
  const { id, index, title, sub, status, body, tags, links, note, featured } = project;

  return (
    <article className={`panel ticks ${styles.card} ${featured ? styles.feature : ''}`}>
      <div className={styles.graphic}>
        <ProjectGraphic id={id} />
      </div>

      <div className={styles.rowTop}>
        <span className={styles.idx}>{index}</span>
        <span className={`chip ${status.kind}`}>
          <span className="led" />
          {status.label}
        </span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.sub}>{sub}</p>
      <p className={styles.body}>{body}</p>

      <div className="tags" style={{ marginTop: 16 }}>
        {tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      {links && links.length > 0 && (
        <div className={styles.links}>
          {links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      )}

      {note && <p className={styles.note}>{note}</p>}
    </article>
  );
}
