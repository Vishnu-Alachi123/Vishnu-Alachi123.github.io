import { useState, useEffect } from 'react';
import styles from './AdminPanel.module.css';

type BlogPost = {
  id: string;
  title: string;
  date: string;
  summary: string;
  body: string;
};

type ExperienceEntry = {
  from: string;
  to: string;
  weekdaysOnly: boolean;
  level: number;
  note: string;
};

type Props = {
  onLogout: () => void;
};

export default function AdminPanel({ onLogout }: Props) {
  const [tab, setTab] = useState<'blog' | 'experience'>('blog');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingExp, setEditingExp] = useState<ExperienceEntry | null>(null);

  useEffect(() => {
    fetch('/data/posts.json')
      .then((r) => r.json())
      .then((data) => setPosts(data || []))
      .catch(() => setPosts([]));

    fetch('/data/experienceLog.json')
      .then((r) => r.json())
      .then((data) => setExperiences(data || []))
      .catch(() => setExperiences([]));
  }, []);

  const handleBlogSave = () => {
    if (!editingBlog) return;
    const idx = posts.findIndex((p) => p.id === editingBlog.id);
    if (idx >= 0) {
      const updated = [...posts];
      updated[idx] = editingBlog;
      setPosts(updated);
    } else {
      setPosts([...posts, editingBlog]);
    }
    setEditingBlog(null);
  };

  const handleExpSave = () => {
    if (!editingExp) return;
    // For experience, we just add/update by position (simplified)
    const idx = experiences.findIndex(
      (e) => e.from === editingExp.from && e.to === editingExp.to && e.note === editingExp.note
    );
    if (idx >= 0) {
      const updated = [...experiences];
      updated[idx] = editingExp;
      setExperiences(updated);
    } else {
      setExperiences([...experiences, editingExp]);
    }
    setEditingExp(null);
  };

  const handleBlogDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleExpDelete = (idx: number) => {
    setExperiences(experiences.filter((_, i) => i !== idx));
  };

  const copyToClipboard = (data: unknown) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert('Copied to clipboard!');
  };

  return (
    <>
      <div className={styles.overlay} onClick={onLogout} />
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Admin panel">
        <div className={styles.head}>
          <h2>Admin Panel</h2>
          <button type="button" className={styles.closeBtn} onClick={onLogout} aria-label="Close">
            ✕
          </button>
        </div>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${tab === 'blog' ? styles.active : ''}`}
            onClick={() => setTab('blog')}
          >
            Blog Posts
          </button>
          <button
            type="button"
            className={`${styles.tab} ${tab === 'experience' ? styles.active : ''}`}
            onClick={() => setTab('experience')}
          >
            Experience
          </button>
        </div>

        <div className={styles.body}>
          {tab === 'blog' && (
            <div>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  setEditingBlog({ id: '', title: '', date: new Date().toISOString().split('T')[0], summary: '', body: '' })
                }
              >
                + New Post
              </button>

              {editingBlog ? (
                <div className={styles.form}>
                  <div>
                    <label>ID</label>
                    <input
                      type="text"
                      value={editingBlog.id}
                      onChange={(e) => setEditingBlog({ ...editingBlog, id: e.target.value })}
                      placeholder="url-safe-id"
                    />
                  </div>
                  <div>
                    <label>Title</label>
                    <input
                      type="text"
                      value={editingBlog.title}
                      onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Date</label>
                    <input
                      type="date"
                      value={editingBlog.date}
                      onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Summary</label>
                    <input
                      type="text"
                      value={editingBlog.summary}
                      onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Body (paragraphs separated by blank lines)</label>
                    <textarea
                      value={editingBlog.body}
                      onChange={(e) => setEditingBlog({ ...editingBlog, body: e.target.value })}
                      rows={6}
                    />
                  </div>
                  <div className={styles.formActions}>
                    <button type="button" className="btn" onClick={handleBlogSave}>
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setEditingBlog(null)}
                      style={{ background: 'var(--canvas-subtle)' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.list}>
                  {posts.length === 0 ? (
                    <p className={styles.empty}>No blog posts yet.</p>
                  ) : (
                    posts.map((post) => (
                      <div key={post.id} className={styles.item}>
                        <div>
                          <strong>{post.title}</strong>
                          <span className={styles.meta}>{post.date}</span>
                        </div>
                        <div className={styles.actions}>
                          <button
                            type="button"
                            className={styles.smallBtn}
                            onClick={() => setEditingBlog(post)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className={styles.smallBtn}
                            onClick={() => handleBlogDelete(post.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              <div className={styles.export}>
                <h4>posts.json</h4>
                <pre>{JSON.stringify(posts, null, 2)}</pre>
                <button
                  type="button"
                  className="btn"
                  onClick={() => copyToClipboard(posts)}
                  style={{ marginTop: '8px' }}
                >
                  Copy JSON
                </button>
              </div>
            </div>
          )}

          {tab === 'experience' && (
            <div>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  setEditingExp({ from: new Date().toISOString().split('T')[0], to: 'present', weekdaysOnly: true, level: 3, note: '' })
                }
              >
                + New Entry
              </button>

              {editingExp ? (
                <div className={styles.form}>
                  <div>
                    <label>From</label>
                    <input
                      type="date"
                      value={editingExp.from}
                      onChange={(e) => setEditingExp({ ...editingExp, from: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>To</label>
                    <input
                      type="text"
                      value={editingExp.to}
                      onChange={(e) => setEditingExp({ ...editingExp, to: e.target.value })}
                      placeholder="YYYY-MM-DD or 'present'"
                    />
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={editingExp.weekdaysOnly}
                        onChange={(e) => setEditingExp({ ...editingExp, weekdaysOnly: e.target.checked })}
                      />
                      Weekdays only
                    </label>
                  </div>
                  <div>
                    <label>Level (0-4)</label>
                    <input
                      type="number"
                      min="0"
                      max="4"
                      value={editingExp.level}
                      onChange={(e) => setEditingExp({ ...editingExp, level: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label>Note</label>
                    <textarea
                      value={editingExp.note}
                      onChange={(e) => setEditingExp({ ...editingExp, note: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className={styles.formActions}>
                    <button type="button" className="btn" onClick={handleExpSave}>
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setEditingExp(null)}
                      style={{ background: 'var(--canvas-subtle)' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.list}>
                  {experiences.length === 0 ? (
                    <p className={styles.empty}>No experience entries yet.</p>
                  ) : (
                    experiences.map((exp, idx) => (
                      <div key={idx} className={styles.item}>
                        <div>
                          <strong>{exp.note}</strong>
                          <span className={styles.meta}>
                            {exp.from} to {exp.to}
                          </span>
                        </div>
                        <div className={styles.actions}>
                          <button
                            type="button"
                            className={styles.smallBtn}
                            onClick={() => setEditingExp(exp)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className={styles.smallBtn}
                            onClick={() => handleExpDelete(idx)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              <div className={styles.export}>
                <h4>experienceLog.json</h4>
                <pre>{JSON.stringify(experiences, null, 2)}</pre>
                <button
                  type="button"
                  className="btn"
                  onClick={() => copyToClipboard(experiences)}
                  style={{ marginTop: '8px' }}
                >
                  Copy JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
