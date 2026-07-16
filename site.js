// Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
  });
}

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll progress hairline (all pages)
(function () {
  const bar = document.createElement('div');
  bar.id = 'scrollProgress';
  document.body.appendChild(bar);
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// Blueprint grid parallax — shift the fixed background slightly against scroll
(function () {
  if (REDUCE) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY * 0.04;
      document.body.style.backgroundPosition = `0 ${-y}px, 0 ${-y}px, 0 0`;
      ticking = false;
    });
  }, { passive: true });
})();

// Card tilt — gentle perspective follow on panels (skips touch + reduced motion)
(function () {
  if (REDUCE || window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.panel').forEach((el) => {
    el.classList.add('tilt');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--ry', (px * 4) + 'deg');
      el.style.setProperty('--rx', (-py * 4) + 'deg');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });
})();

// Magnetic primary buttons
(function () {
  if (REDUCE || window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.btn-primary').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width - 0.5) * 6;
      const dy = ((e.clientY - r.top) / r.height - 0.5) * 4;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
})();

// Animated counters (about panel) — count up on first reveal
(function () {
  const nums = document.querySelectorAll('.counters .n[data-count]');
  if (!nums.length) return;
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (REDUCE) { el.textContent = target; return; }
    const t0 = performance.now(), dur = 900;
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  nums.forEach((el) => io.observe(el));
})();

// GitHub activity ticker — last pushes, cached 1h, hides on failure
(function () {
  const box = document.getElementById('ghTicker');
  if (!box) return;
  const KEY = 'gh_ticker_v1';
  const render = (items) => {
    if (!items || !items.length) return;
    items.slice(0, 3).forEach((it) => {
      const row = document.createElement('span');
      const ago = timeAgo(new Date(it.when));
      row.innerHTML = `<a href="https://github.com/${it.repo}" target="_blank" rel="noopener">${it.repo.split('/')[1]}</a> · ${escapeHtml(it.msg)} <span class="t">· ${ago}</span>`;
      box.appendChild(row);
    });
    box.classList.add('on');
  };
  const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const timeAgo = (d) => {
    const s = (Date.now() - d.getTime()) / 1000;
    if (s < 3600) return Math.max(1, Math.round(s / 60)) + 'm ago';
    if (s < 86400) return Math.round(s / 3600) + 'h ago';
    return Math.round(s / 86400) + 'd ago';
  };
  try {
    const cached = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (cached && Date.now() - cached.at < 3600e3 && cached.items.length) { render(cached.items); return; }
  } catch (e) {}
  fetch('https://api.github.com/users/Vishnu-Alachi123/repos?sort=pushed&per_page=6')
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((repos) => {
      const items = repos
        .filter((r) => !r.fork)
        .slice(0, 3)
        .map((r) => ({
          repo: r.full_name,
          msg: r.description ? r.description.slice(0, 56) : (r.language || 'updated'),
          when: r.pushed_at,
        }));
      try { localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), items })); } catch (e) {}
      render(items);
    })
    .catch(() => { /* stay hidden */ });
})();

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
    // keyboard arrows
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') track.scrollBy({ left: step(), behavior: 'smooth' });
      if (e.key === 'ArrowLeft') track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    // drag / swipe to scroll
    let down = false, startX = 0, startScroll = 0, moved = 0;
    track.addEventListener('pointerdown', (e) => {
      down = true; moved = 0; startX = e.clientX; startScroll = track.scrollLeft;
      track.classList.add('dragging');
    });
    track.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX; moved = Math.abs(dx);
      track.scrollLeft = startScroll - dx;
    });
    const end = () => { down = false; track.classList.remove('dragging'); };
    track.addEventListener('pointerup', end);
    track.addEventListener('pointerleave', end);
    track.addEventListener('click', (e) => { if (moved > 6) e.preventDefault(); }, true);

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
