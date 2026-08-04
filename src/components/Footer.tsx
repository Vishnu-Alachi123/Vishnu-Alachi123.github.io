import styles from './Footer.module.css';

type Props = {
  onAdminClick: () => void;
};

export default function Footer({ onAdminClick }: Props) {
  return (
    <footer className={styles.foot}>
      <button
        type="button"
        className={styles.hiddenLogin}
        onClick={onAdminClick}
        aria-label="Admin login"
        title="Admin"
      />
      <div className={styles.inner}>
        <div className={styles.row}>
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
        <p className={styles.disclaimer}>
          This is my personal portfolio, laid out in the style of a GitHub profile — it isn&apos;t
          github.com and isn&apos;t affiliated with GitHub.
        </p>
      </div>
    </footer>
  );
}
