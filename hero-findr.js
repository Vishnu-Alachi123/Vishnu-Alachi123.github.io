/* Findr discovery-radar hero.
   A blueprint-style street map on <canvas>; the cursor drives a radar sweep
   that lights up nearby pins and pops their labels. A search bar overlay
   types sample queries. No dependencies. Reduced-motion → static frame. */
(function () {
  const mount = document.getElementById('hero-canvas');
  if (!mount) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- DOM: canvas + search bar overlay ----------
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
  mount.appendChild(canvas);

  const search = document.createElement('div');
  search.className = 'findr-search';
  search.innerHTML =
    '<span class="findr-search-icon">⌕</span><span id="findrQuery"></span><span class="findr-caret"></span>' +
    '<span class="findr-brand">findr<i></i></span>';
  mount.appendChild(search);

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = mount.clientWidth;
    H = mount.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    placePins();
  }

  // ---------- pins ----------
  const PIN_DEFS = [
    { fx: 0.16, fy: 0.30, icon: '⚡', label: 'Club fair · 0.3 mi' },
    { fx: 0.34, fy: 0.62, icon: '🏀', label: 'Pickup game tonight' },
    { fx: 0.52, fy: 0.26, icon: '📚', label: 'Study group · CSC 480' },
    { fx: 0.68, fy: 0.55, icon: '🎸', label: 'Open mic · 8pm' },
    { fx: 0.84, fy: 0.30, icon: '🍕', label: 'Free pizza @ eng quad' },
    { fx: 0.24, fy: 0.82, icon: '💼', label: 'Career mixer · Thu' },
    { fx: 0.60, fy: 0.80, icon: '⚽', label: 'Intramural signups' },
    { fx: 0.86, fy: 0.72, icon: '🧗', label: 'Climbing meetup' },
  ];
  const pins = PIN_DEFS.map((p) => ({ ...p, x: 0, y: 0, glow: 0 }));
  function placePins() {
    pins.forEach((p) => { p.x = p.fx * W; p.y = p.fy * H; });
  }

  // ---------- radar state ----------
  const radar = { x: 0.4, y: 0.5, tx: 0.4, ty: 0.5, active: false };
  let pointerInside = false;

  mount.addEventListener('pointermove', (e) => {
    const r = mount.getBoundingClientRect();
    radar.tx = (e.clientX - r.left) / r.width;
    radar.ty = (e.clientY - r.top) / r.height;
    pointerInside = true;
  });
  mount.addEventListener('pointerleave', () => { pointerInside = false; });

  // ---------- typing search bar ----------
  const QUERIES = ['find things near me…', 'events this weekend', 'pickup basketball', 'study spots open late', 'clubs for makers'];
  const queryEl = () => document.getElementById('findrQuery');
  let qi = 0, qchar = 0, qdir = 1, qwait = 0;
  function tickType() {
    const el = queryEl();
    if (!el) return;
    if (qwait > 0) { qwait--; return; }
    qchar += qdir;
    const q = QUERIES[qi];
    if (qchar >= q.length) { qchar = q.length; qwait = 90; qdir = -1; }
    if (qchar <= 0 && qdir === -1) { qchar = 0; qdir = 1; qi = (qi + 1) % QUERIES.length; qwait = 20; }
    el.textContent = q.slice(0, qchar);
  }

  // ---------- drawing ----------
  const CYAN = '#52c7ff', AMBER = '#ffb454';

  function drawMap() {
    // street grid: minor lines
    ctx.strokeStyle = 'rgba(82,199,255,0.07)';
    ctx.lineWidth = 1;
    const step = 46;
    ctx.beginPath();
    for (let x = step; x < W; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
    for (let y = step; y < H; y += step) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.stroke();
    // main roads
    ctx.strokeStyle = 'rgba(82,199,255,0.16)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, H * 0.42); ctx.bezierCurveTo(W * 0.3, H * 0.36, W * 0.6, H * 0.5, W, H * 0.40);
    ctx.moveTo(W * 0.3, 0); ctx.bezierCurveTo(W * 0.34, H * 0.4, W * 0.26, H * 0.7, W * 0.32, H);
    ctx.moveTo(W * 0.72, 0); ctx.bezierCurveTo(W * 0.7, H * 0.35, W * 0.76, H * 0.7, W * 0.7, H);
    ctx.stroke();
  }

  function drawRadar(cx, cy, t) {
    // soft glow
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150);
    grad.addColorStop(0, 'rgba(82,199,255,0.10)');
    grad.addColorStop(1, 'rgba(82,199,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(cx - 150, cy - 150, 300, 300);

    // expanding pulse rings
    for (let k = 0; k < 2; k++) {
      const phase = ((t * 0.7 + k * 0.5) % 1);
      const r = 20 + phase * 130;
      ctx.strokeStyle = `rgba(82,199,255,${0.5 * (1 - phase)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    // center dot + crosshair ticks
    ctx.fillStyle = CYAN;
    ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(82,199,255,0.55)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    [[-14, 0, -7, 0], [14, 0, 7, 0], [0, -14, 0, -7], [0, 14, 0, 7]].forEach(([x1, y1, x2, y2]) => {
      ctx.moveTo(cx + x1, cy + y1); ctx.lineTo(cx + x2, cy + y2);
    });
    ctx.stroke();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawPin(p) {
    const lit = p.glow > 0.02;
    const base = lit ? p.glow : 0;

    // pin marker
    ctx.save();
    ctx.translate(p.x, p.y);
    const r = 7 + base * 3;
    ctx.strokeStyle = lit ? AMBER : 'rgba(82,199,255,0.7)';
    ctx.fillStyle = lit ? `rgba(255,180,84,${0.15 + base * 0.25})` : 'rgba(82,199,255,0.10)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = lit ? AMBER : CYAN;
    ctx.fill();
    ctx.restore();

    // label bubble
    if (base > 0.05) {
      const text = `${p.icon} ${p.label}`;
      ctx.font = '11px "JetBrains Mono", monospace';
      const tw = ctx.measureText(text).width;
      const bw = tw + 18, bh = 24;
      let bx = p.x - bw / 2, by = p.y - 16 - bh;
      bx = Math.max(6, Math.min(W - bw - 6, bx));
      if (by < 6) by = p.y + 16;
      ctx.globalAlpha = Math.min(1, base * 1.4);
      ctx.fillStyle = 'rgba(13,17,23,0.92)';
      ctx.strokeStyle = lit ? 'rgba(255,180,84,0.6)' : 'rgba(82,199,255,0.4)';
      ctx.lineWidth = 1;
      roundRect(bx, by, bw, bh, 6);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#dce3ec';
      ctx.fillText(text, bx + 9, by + 16);
      ctx.globalAlpha = 1;
    }
  }

  // ---------- main loop ----------
  let raf, t0 = performance.now();
  function frame(now) {
    const t = (now - t0) / 1000;

    // idle drift when pointer is away
    if (!pointerInside) {
      radar.tx = 0.42 + 0.30 * Math.sin(t * 0.23);
      radar.ty = 0.48 + 0.26 * Math.sin(t * 0.31 + 1.7);
    }
    radar.x += (radar.tx - radar.x) * 0.06;
    radar.y += (radar.ty - radar.y) * 0.06;

    const cx = radar.x * W, cy = radar.y * H;

    ctx.clearRect(0, 0, W, H);
    drawMap();
    drawRadar(cx, cy, t);

    pins.forEach((p) => {
      const d = Math.hypot(p.x - cx, p.y - cy);
      const target = d < 120 ? 1 - d / 120 : 0;
      p.glow += (target - p.glow) * 0.12;
      drawPin(p);
    });

    if (t % 0.033 < 0.02) tickType(); // ~30fps typing cadence
    raf = requestAnimationFrame(frame);
  }

  function staticFrame() {
    ctx.clearRect(0, 0, W, H);
    drawMap();
    drawRadar(W * 0.45, H * 0.5, 0.4);
    pins.forEach((p, i) => {
      p.glow = i === 2 ? 0.9 : 0; // one lit pin with label
      drawPin(p);
    });
    const el = queryEl();
    if (el) el.textContent = 'find things near me…';
  }

  resize();
  window.addEventListener('resize', resize);

  if (reduceMotion) {
    staticFrame();
  } else {
    raf = requestAnimationFrame(frame);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { t0 = performance.now() - 1; raf = requestAnimationFrame(frame); }
    });
  }
})();
