import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={styles.inner}>
        <span>© 2026 Vishnu Alachi</span>
        <div className={styles.links}>
          <a href="https://github.com/Vishnu-Alachi123" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/vishnu-alachi/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
