import { useState, type FormEvent } from 'react';
import styles from './ContactCard.module.css';

const ENDPOINT = 'https://formsubmit.co/ajax/vishnualachi@gmail.com';

type Errors = { name?: boolean; email?: boolean; message?: boolean };

const CHANNELS = [
  { label: 'Email', value: 'vishnualachi@gmail.com', href: 'mailto:vishnualachi@gmail.com' },
  { label: 'LinkedIn', value: '/in/vishnu-alachi', href: 'https://www.linkedin.com/in/vishnu-alachi/' },
  { label: 'GitHub', value: '@Vishnu-Alachi123', href: 'https://github.com/Vishnu-Alachi123' },
  { label: 'Findr', value: 'findr.page', href: 'https://findr.page' },
];

export default function ContactCard() {
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
    if (values._honey) return;

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
          _subject: 'New message from your GitHub-style profile',
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
    <div className={styles.grid}>
      <div className={styles.card}>
        {sent ? (
          <div className={styles.success}>
            <h3>Message sent</h3>
            <p>Thanks — I&apos;ll be in touch. Your message is on its way to my inbox.</p>
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
            <button type="submit" className="btn btn-primary" disabled={sending} style={{ width: '100%' }}>
              {sending ? 'Sending…' : 'Send message'}
            </button>
            {status && <p className={`${styles.status} ${styles.bad}`}>{status}</p>}
          </form>
        )}
      </div>

      <div className={styles.channels}>
        {CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={styles.channel}
          >
            <div className={styles.channelLabel}>{c.label}</div>
            <div className={styles.channelValue}>{c.value}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
