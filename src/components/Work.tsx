import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import styles from './Work.module.css';

export default function Work() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="wrap section">
      <div className="section-head">
        <span className="eyebrow">// selected work</span>
        <h2>Things I&apos;ve built and shipped.</h2>
        <p>
          A campus product with real users, an AI operations agent running in production, learning
          hardware, and a few tools I use myself. Each one is something I took from idea to working
          software.
        </p>
      </div>

      {featured && (
        <Reveal className={styles.feature}>
          <ProjectCard project={featured} />
        </Reveal>
      )}

      <div className={styles.grid}>
        {rest.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 80}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
