import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={styles.inner}>
        <span>© 2026 VISHNU ALACHI · BUILT WITH REACT + TYPESCRIPT</span>
        <div className={styles.links}>
          <a href="https://github.com/Vishnu-Alachi123" target="_blank" rel="noopener noreferrer">
            GITHUB
          </a>
          <a href="https://www.linkedin.com/in/vishnu-alachi/" target="_blank" rel="noopener noreferrer">
            LINKEDIN
          </a>
          <a href="#contact">CONTACT</a>
        </div>
      </div>
    </footer>
  );
}
