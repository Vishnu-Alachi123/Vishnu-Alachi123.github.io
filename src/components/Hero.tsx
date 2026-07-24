import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" className="wrap">
      <div className={styles.hero}>
        <span className={`eyebrow ${styles.eyebrow}`}>Software Engineer · Cal Poly SLO</span>

        <h1 className={styles.title}>
          I design software systems that <span className={styles.accent}>solve real problems</span>.
        </h1>

        <p className={styles.lede}>
          I&apos;m Vishnu Alachi — a software engineering student at Cal Poly SLO, heading into my
          final year and graduating <strong>December 2026</strong>, and I&apos;m looking for new-grad
          roles. I like taking messy, real-world problems and turning them into software that&apos;s
          reliable and genuinely useful — from <strong>Findr</strong>, a campus app I run with real
          users, to AI agents that operate production infrastructure.
        </p>

        <div className={styles.ctas}>
          <a href="#work" className="btn btn-primary">
            VIEW WORK →
          </a>
          <a href="#contact" className="btn btn-ghost">
            GET IN TOUCH
          </a>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>Dec 2026</div>
            <div className={styles.statLabel}>Graduating</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>Oracle</div>
            <div className={styles.statLabel}>SWE Intern</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>Findr</div>
            <div className={styles.statLabel}>Founder · live</div>
          </div>
        </div>

        <a href="#work" className={styles.scroll} aria-label="Scroll to work">
          SCROLL ↓
        </a>
      </div>
    </section>
  );
}
