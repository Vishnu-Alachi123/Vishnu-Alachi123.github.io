import { Suspense, lazy } from 'react';
import styles from './Hero.module.css';

// three.js is heavy; load the WebGL scene as its own chunk after first paint.
const Scene = lazy(() => import('./Scene'));

export default function Hero() {
  return (
    <section id="top" className="wrap">
      <div className={styles.hero}>
        <div>
          <span className="eyebrow">Software Engineer · Cal Poly SLO</span>
          <h1 className={styles.title}>
            I build applications,
            <br />
            <span className={styles.accent}>AI agents</span>,<br />
            and working hardware.
          </h1>
          <p className={styles.lede}>
            I&apos;m Vishnu Alachi, a software engineering student at Cal Poly SLO graduating in
            December 2026 and pursuing new-grad roles. My work spans a campus discovery app I&apos;m
            building (<strong>Findr</strong>), AI agents that operate real infrastructure, and a robot
            arm learning to see and grasp objects in the physical world.
          </p>
          <div className={styles.ctas}>
            <a href="#work" className="btn btn-primary">
              VIEW WORK →
            </a>
            <a
              href="https://github.com/Vishnu-Alachi123"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              GITHUB ↗
            </a>
          </div>
          <div className={styles.stats}>
            <span>
              <b>Findr</b> · founder · shipping to beta
            </span>
            <span>
              <b>Oracle</b> · AI ops tooling
            </span>
            <span>
              <b>Grad</b> · Dec 2026
            </span>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.canvas}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </div>
          <span className={styles.capTop}>FIG.01 — SYSTEM MESH · MOVE CURSOR</span>
          <span className={styles.capBottom}>INTERACTIVE · WEBGL</span>
        </div>
      </div>
    </section>
  );
}
