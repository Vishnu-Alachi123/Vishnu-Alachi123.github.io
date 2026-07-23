import { useEffect, useState } from 'react';

/** Thin cyan progress hairline fixed to the top of the viewport. */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: `${pct}%`,
        background: 'linear-gradient(90deg, var(--cyan), rgba(82,199,255,0.4))',
        boxShadow: '0 0 8px rgba(82,199,255,0.5)',
        zIndex: 60,
        pointerEvents: 'none',
      }}
    />
  );
}
