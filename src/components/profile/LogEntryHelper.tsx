import { useState } from 'react';
import styles from './SettingsPanel.module.css';

const REPO_FILE_URL =
  'https://github.com/Vishnu-Alachi123/Vishnu-Alachi123.github.io/edit/main/src/data/experienceLog.json';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Generates a ready-to-paste entry for src/data/experienceLog.json — there's
 * no backend to write to the repo from the browser (that would mean either
 * shipping a write-capable token to every visitor, or standing up an
 * authenticated service — a bigger, separate decision), so this gets you
 * from "what did I do today" to a pasteable snippet in a few seconds, with
 * a direct link to where to paste it.
 */
export default function LogEntryHelper() {
  const [from, setFrom] = useState(today());
  const [to, setTo] = useState('present');
  const [level, setLevel] = useState(3);
  const [weekdaysOnly, setWeekdaysOnly] = useState(true);
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);

  const snippet = JSON.stringify(
    { from, to: to.trim() || from, weekdaysOnly, level, note: note.trim() || '…' },
    null,
    2,
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet + ',');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API unavailable — the text is still visible to select manually */
    }
  };

  return (
    <div className={styles.group}>
      <h3>Log what you were doing</h3>
      <div className={styles.logRow}>
        <label className={styles.logLabel}>
          From
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={styles.logInput} />
        </label>
        <label className={styles.logLabel}>
          To
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="YYYY-MM-DD or present"
            className={styles.logInput}
          />
        </label>
      </div>
      <div className={styles.logRow}>
        <label className={styles.logLabel}>
          Level
          <select value={level} onChange={(e) => setLevel(Number(e.target.value))} className={styles.logInput}>
            {[0, 1, 2, 3, 4].map((l) => (
              <option key={l} value={l}>
                {l} {l === 0 ? '(none)' : l === 4 ? '(heaviest)' : ''}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.logCheck}>
          <input type="checkbox" checked={weekdaysOnly} onChange={(e) => setWeekdaysOnly(e.target.checked)} />
          Weekdays only
        </label>
      </div>
      <label className={styles.logLabel} style={{ marginTop: 8 }}>
        What were you doing?
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Software Development Intern @ Oracle"
          rows={2}
          className={styles.logTextarea}
        />
      </label>

      <div className={styles.logActions}>
        <button type="button" className="btn" onClick={copy}>
          {copied ? 'Copied ✓' : 'Copy entry'}
        </button>
        <a href={REPO_FILE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Open experienceLog.json ↗
        </a>
      </div>
      <p className={styles.hint}>
        Copies a ready-to-paste JSON entry. Open the file on GitHub, paste it into the array, and commit —
        the site picks it up on the next deploy.
      </p>
    </div>
  );
}
