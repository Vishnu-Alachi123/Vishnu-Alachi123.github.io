import { useEffect, useRef, useState } from 'react';

const REDUCE =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type Props = { value: number; label: string };

/** Counts up from 0 to `value` the first time it scrolls into view. */
export default function Counter({ value, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(REDUCE ? value : 0);
  const started = useRef(false);

  useEffect(() => {
    if (REDUCE) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || started.current) return;
          started.current = true;
          obs.unobserve(e.target);
          const t0 = performance.now();
          const dur = 900;
          const step = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="counter">
      <span className="counter-n">{display}</span>
      <span className="counter-l">{label}</span>
    </div>
  );
}
