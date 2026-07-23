import { useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import styles from './Nav.module.css';

const LINKS = [
  { id: 'work', label: '/work' },
  { id: 'about', label: '/about' },
  { id: 'experience', label: '/experience' },
  { id: 'contact', label: '/contact' },
];
const IDS = LINKS.map((l) => l.id); // stable reference for the scrollspy effect

export default function Nav() {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(IDS);

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.dot} />
          VISHNU<span className={styles.tick}>_</span>ALACHI
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
              ↓ RÉSUMÉ
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
              ↓ résumé
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
