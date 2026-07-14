// Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
  });
}

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
