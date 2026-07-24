import { useEffect, useRef, useState } from 'react';
import type { Project } from '../data/projects';
import styles from './ProjectCard.module.css';

/**
 * Card media area. Shows a branded fallback tile always; for projects with a
 * live URL, lazily overlays an embedded preview once the card scrolls into
 * view. The embed is non-interactive (the whole card links out).
 */
const CAPTION: Record<string, string> = {
  prod: 'Internal build',
  dev: 'In development',
  done: 'Runs locally',
  live: 'Live preview',
};

export default function ProjectPreview({ project }: { project: Project }) {
  const { title, preview, status } = project;
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const initial = title.trim().charAt(0).toUpperCase();
  const caption = preview ? 'Live preview ↗' : CAPTION[status.kind] ?? 'Project';

  useEffect(() => {
    if (!preview) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShow(true);
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [preview]);

  return (
    <div className={styles.media} ref={ref}>
      {/* fallback tile (also the backdrop while the embed loads) */}
      <div className={styles.tile}>
        <span className={styles.tileMark} aria-hidden="true">
          {initial}
        </span>
        <span className={styles.tileCap}>{caption}</span>
      </div>

      {preview && show && (
        <iframe
          className={styles.frame}
          src={preview}
          title={`${title} live preview`}
          loading="lazy"
          tabIndex={-1}
          scrolling="no"
          sandbox="allow-scripts allow-same-origin"
        />
      )}

      {preview && (
        <span className={styles.liveBadge}>
          <span className="led" />
          {status.kind === 'live' ? 'LIVE' : status.label.toUpperCase()}
        </span>
      )}
    </div>
  );
}
