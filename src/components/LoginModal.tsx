import { useState } from 'react';
import styles from './LoginModal.module.css';

const ADMIN_PASSWORD = 'SUPERMAN123!';

type Props = {
  onLogin: () => void;
  onClose: () => void;
};

export default function LoginModal({ onLogin, onClose }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_authenticated', 'true');
      onLogin();
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Admin login">
        <div className={styles.content}>
          <h2>Admin Access</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className={styles.input}
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.buttons}>
              <button type="submit" className="btn">
                Login
              </button>
              <button type="button" className="btn" onClick={onClose} style={{ background: 'var(--canvas-subtle)' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
