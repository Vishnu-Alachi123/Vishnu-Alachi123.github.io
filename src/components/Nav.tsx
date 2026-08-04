import { useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import styles from './Nav.module.css';

const LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'repositories', label: 'Repositories' },
  { id: 'experience', label: 'Experience' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];
const IDS = LINKS.map((l) => l.id);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(IDS);

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="#overview" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.mark} aria-hidden="true">
            VA
          </span>
          Vishnu Alachi
        </a>

        <button
          className={styles.menuBtn}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ≡
        </button>

        <ul className={styles.links}>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? styles.active : ''}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/Vishnu_Alachi_resume.pdf" download className={`btn btn-ghost ${styles.resume}`}>
              ↓ Resume
            </a>
          </li>
        </ul>
      </div>

      {open && (
        <ul className={styles.mobile}>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/Vishnu_Alachi_resume.pdf" download onClick={() => setOpen(false)}>
              ↓ Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
