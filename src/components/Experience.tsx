import { roles, skills, coursework } from '../data/experience';
import Reveal from './Reveal';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience" className="wrap section">
      <div className={`section-head ${styles.head}`}>
        <div>
          <span className="eyebrow">// experience</span>
          <h2>Where I&apos;ve worked and what I&apos;ve studied.</h2>
        </div>
        <a href="/Vishnu_Alachi_resume.pdf" download className="btn btn-primary">
          ↓ DOWNLOAD PDF
        </a>
      </div>

      <div className={styles.stack}>
        <Reveal>
          <section className={`panel ticks ${styles.panel}`}>
            <span className="eyebrow">// education</span>
            <div className={styles.eduRow}>
              <div>
                <p className={styles.school}>
                  California Polytechnic State University, San Luis Obispo
                </p>
                <p className={styles.detail}>
                  B.S. in Software Engineering · Third year · Graduating December 2026
                </p>
              </div>
              <p className={styles.gpa}>GPA 3.4</p>
            </div>
          </section>
        </Reveal>

        <Reveal delay={60}>
          <section className={`panel ticks ${styles.panel}`}>
            <span className="eyebrow">// roles</span>
            <div className={styles.roles}>
              {roles.map((r) => (
                <div key={r.org}>
                  <div className={styles.roleHead}>
                    <p className={styles.title}>{r.title}</p>
                    <p className={styles.org}>{r.org.toUpperCase()}</p>
                  </div>
                  <ul className={styles.points}>
                    {r.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <div className={styles.two}>
          <Reveal>
            <section className={`panel ticks ${styles.panel}`} style={{ height: '100%' }}>
              <span className="eyebrow">// skills</span>
              <div className="tags" style={{ marginTop: 16 }}>
                {skills.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>
          <Reveal delay={80}>
            <section className={`panel ticks ${styles.panel}`} style={{ height: '100%' }}>
              <span className="eyebrow">// coursework</span>
              <ul className={styles.list}>
                {coursework.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
