import { useRepoCount } from '../hooks/useRepoCount';
import { skills, currentlyLearning } from '../data/experience';
import Counter from './Counter';
import Reveal from './Reveal';
import styles from './About.module.css';

export default function About() {
  const repos = useRepoCount(7);

  return (
    <section id="about" className="wrap section">
      <div className={styles.grid}>
        <Reveal>
          <div className={`panel ticks ${styles.panel}`}>
            <span className="eyebrow">// about</span>
            <h2 className={styles.h}>
              A third-year engineer who turns hard problems into working software.
            </h2>
            <p className={styles.p}>
              I&apos;m a third-year software engineering student at Cal Poly, San Luis Obispo,
              entering my fourth year and graduating in December 2026. What draws me to this field is
              problem-solving — taking hard, ambiguous challenges and turning them into software that
              is safe, testable, and genuinely useful.
            </p>
            <p className={styles.p}>
              My recent coursework has focused on data and machine learning — knowledge discovery in
              databases, artificial intelligence, and linear models — and it shows up directly in
              what I build: Findr, AI agents that operate real infrastructure, and hardware that
              learns from what it sees.
            </p>
            <p className={`dimline ${styles.rule}`}>
              OFF&nbsp;THE&nbsp;CLOCK&nbsp;→ basketball · soccer · drawing · mechanical builds
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className={`panel ticks ${styles.panel}`}>
            <span className="eyebrow">// toolbox</span>
            <div className="tags" style={{ marginTop: 16 }}>
              {skills.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>

            <div className="counters">
              <Counter value={6} label="Projects" />
              <Counter value={3} label="Live demos" />
              <Counter value={repos} label="Public repos" />
            </div>

            <div className={styles.learnHead}>
              <span className="eyebrow">// currently learning</span>
              <ul className={styles.learnList}>
                {currentlyLearning.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
