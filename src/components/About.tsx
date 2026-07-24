import { useRepoCount } from '../hooks/useRepoCount';
import { useResume } from '../hooks/useResume';
import Counter from './Counter';
import Reveal from './Reveal';
import styles from './About.module.css';

export default function About() {
  const repos = useRepoCount(7);
  const { profile, skills, currentlyLearning, certifications } = useResume();

  return (
    <section id="about" className="wrap section">
      <div className="section-head">
        <span className="eyebrow">// about</span>
        <h2>Turning hard problems into working software.</h2>
      </div>

      <div className={styles.grid}>
        <Reveal>
          <div className={`panel ticks ${styles.panel}`}>
            <p className={styles.p}>
              I&apos;m a software engineering student at Cal Poly, San Luis Obispo, now in my final
              year and graduating in December 2026. What draws me to this field is problem-solving —
              taking hard, ambiguous challenges and designing software systems that are reliable,
              testable, and genuinely useful.
            </p>
            <p className={styles.p}>
              My coursework has leaned into data and machine learning — knowledge discovery in
              databases, artificial intelligence, and linear models — and it shows up directly in
              what I build: Findr, AI agents that operate real infrastructure, and applied computer
              vision.
            </p>
            <div className={styles.highlights}>
              <div className={`${styles.highlight} ${styles.accent}`}>
                <div className={styles.k}>Graduating</div>
                <div className={styles.v}>{profile.graduation}</div>
              </div>
              <div className={styles.highlight}>
                <div className={styles.k}>Standing</div>
                <div className={styles.v}>{profile.year}</div>
              </div>
              <div className={styles.highlight}>
                <div className={styles.k}>GPA</div>
                <div className={styles.v}>{profile.gpa}</div>
              </div>
              <div className={styles.highlight}>
                <div className={styles.k}>Seeking</div>
                <div className={styles.v}>{profile.seeking}</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className={`panel ticks ${styles.panel}`}>
            <span className="eyebrow">// toolbox</span>
            <div className={`tags ${styles.tools}`}>
              {skills.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
            <div className="counters" style={{ marginTop: 'auto', paddingTop: 24 }}>
              <Counter value={6} label="Projects" />
              <Counter value={3} label="Live demos" />
              <Counter value={repos} label="Public repos" />
            </div>
          </div>
        </Reveal>
      </div>

      <div className={styles.focus} data-single={certifications.length === 0}>
        <Reveal>
          <div className={`panel ticks ${styles.focusPanel}`}>
            <span className="eyebrow">// currently learning</span>
            <ul className={styles.learnList}>
              {currentlyLearning.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        {certifications.length > 0 && (
          <Reveal delay={80}>
            <div className={`panel ticks ${styles.focusPanel}`}>
              <span className="eyebrow">// certifications</span>
              <ul className={styles.certList}>
                {certifications.map((c) => (
                  <li key={c.name} className={styles.cert}>
                    <div>
                      {c.url ? (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.name}
                        >
                          {c.name} ↗
                        </a>
                      ) : (
                        <div className={styles.name}>{c.name}</div>
                      )}
                      <div className={styles.issuer}>{c.issuer}</div>
                    </div>
                    {c.year && <span className={styles.year}>{c.year}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
