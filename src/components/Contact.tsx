import { useState, type FormEvent } from 'react';
import Reveal from './Reveal';
import styles from './Contact.module.css';

const ENDPOINT = 'https://formsubmit.co/ajax/vishnualachi@gmail.com';

type Errors = { name?: boolean; email?: boolean; message?: boolean };

const CHANNELS = [
  { k: '01 · EMAIL', v: 'vishnualachi@gmail.com', href: 'mailto:vishnualachi@gmail.com' },
  { k: '02 · LINKEDIN', v: '/in/vishnu-alachi ↗', href: 'https://www.linkedin.com/in/vishnu-alachi/' },
  { k: '03 · GITHUB', v: '@Vishnu-Alachi123 ↗', href: 'https://github.com/Vishnu-Alachi123' },
  { k: '04 · FINDR', v: 'findr.page ↗', href: 'https://findr.page' },
];

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '', _honey: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const check = (v: typeof values): Errors => ({
    name: v.name.trim().length < 2,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()),
    message: v.message.trim().length < 5,
  });

  const onChange = (field: keyof typeof values) => (e: { target: { value: string } }) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (errors[field as keyof Errors]) setErrors(check(next));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = check(values);
    setErrors(found);
    if (found.name || found.email || found.message) {
      setStatus('Please fix the highlighted fields.');
      return;
    }
    if (values._honey) return; // bot trap

    setSending(true);
    setStatus('');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          _subject: 'New message from your portfolio site',
          _template: 'table',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === 'true' || data.success === true || res.status === 200)) {
        setSent(true);
      } else {
        throw new Error();
      }
    } catch {
      setStatus('Something went wrong — email me directly at vishnualachi@gmail.com.');
      setSending(false);
    }
  }

  return (
    <section id="contact" className="wrap section">
      <div className="section-head">
        <span className="eyebrow">// open a channel</span>
        <h2>Let&apos;s build something.</h2>
        <p>
          Open to internships, collaboration, and hard problems. Drop me a message below — it lands
          straight in my inbox — or reach out through any channel on the right.
        </p>
      </div>

      <div className={styles.grid}>
        <Reveal>
          <section className={`panel ticks ${styles.formPanel}`}>
            {sent ? (
              <div className={styles.success}>
                <p className="mono" style={{ color: 'var(--green)', letterSpacing: '.1em' }}>
                  // MESSAGE SENT
                </p>
                <h3>Thanks — I&apos;ll be in touch.</h3>
                <p>Your message is on its way to my inbox.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className={`${styles.field} ${errors.name ? styles.invalid : ''}`}>
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    value={values.name}
                    onChange={onChange('name')}
                    onBlur={() => setErrors(check(values))}
                  />
                  {errors.name && <span className={styles.err}>Please enter your name.</span>}
                </div>

                <div className={`${styles.field} ${errors.email ? styles.invalid : ''}`}>
                  <label htmlFor="email">Your email</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    value={values.email}
                    onChange={onChange('email')}
                    onBlur={() => setErrors(check(values))}
                  />
                  {errors.email && <span className={styles.err}>Please enter a valid email.</span>}
                </div>

                <div className={`${styles.field} ${errors.message ? styles.invalid : ''}`}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="What would you like to build or talk about?"
                    value={values.message}
                    onChange={onChange('message')}
                    onBlur={() => setErrors(check(values))}
                  />
                  {errors.message && <span className={styles.err}>Please add a short message.</span>}
                </div>

                <input
                  type="text"
                  className={styles.honey}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={values._honey}
                  onChange={onChange('_honey')}
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {sending ? 'SENDING…' : 'SEND MESSAGE →'}
                </button>
                {status && <p className={`${styles.status} ${styles.bad}`}>{status}</p>}
              </form>
            )}
          </section>
        </Reveal>

        <Reveal delay={80}>
          <aside className={styles.channels}>
            {CHANNELS.map((c) => (
              <a
                key={c.k}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`panel ticks ${styles.channel}`}
              >
                <span className={styles.k}>{c.k}</span>
                <p className={styles.v}>{c.v}</p>
              </a>
            ))}
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
