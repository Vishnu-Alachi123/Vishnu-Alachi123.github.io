// Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
  });
}

// Scroll-reveal for content panels (skips carousel cards + respects reduced motion)
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const track = document.getElementById('carouselTrack');
  const targets = Array.from(document.querySelectorAll('.panel'))
    .filter((el) => !track || !track.contains(el));
  targets.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
})();

// Projects carousel
const track = document.getElementById('carouselTrack');
if (track) {
  const prev = document.getElementById('carouselPrev');
  const next = document.getElementById('carouselNext');
  const step = () => Math.min(track.clientWidth * 0.85, 440);
  prev && prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next && next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

  const dotsWrap = document.getElementById('carouselDots');
  const cards = Array.from(track.children);
  if (dotsWrap) {
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
      dot.addEventListener('click', () =>
        cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = cards.indexOf(e.target);
          dots.forEach((d, i) => {
            d.style.width = i === idx ? '20px' : '6px';
            d.style.background = i === idx ? 'var(--cyan)' : 'rgba(255,255,255,.16)';
          });
        }
      });
    }, { root: track, threshold: 0.6 });
    cards.forEach((c) => io.observe(c));
  }
}
