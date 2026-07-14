/* Interactive robot arm hero — built with primitives, tracks the cursor.
   Requires THREE (loaded via CDN before this script). Degrades gracefully. */
(function () {
  const mount = document.getElementById('hero-canvas');
  if (!mount || typeof THREE === 'undefined') return;

  const W = () => mount.clientWidth;
  const H = () => mount.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, W() / H(), 0.1, 100);
  camera.position.set(4.2, 2.6, 6.4);
  camera.lookAt(0, 1.4, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  mount.appendChild(renderer.domElement);

  // Lighting
  scene.add(new THREE.HemisphereLight(0x9fd8ff, 0x0b0d11, 0.55));
  const key = new THREE.DirectionalLight(0x8fdcff, 1.4);
  key.position.set(5, 8, 4); scene.add(key);
  const rim = new THREE.PointLight(0xffb454, 1.1, 30); rim.position.set(-5, 3, -3); scene.add(rim);

  // Materials
  const metal = new THREE.MeshStandardMaterial({ color: 0x2a323d, metalness: 0.85, roughness: 0.35 });
  const accent = new THREE.MeshStandardMaterial({ color: 0x52c7ff, metalness: 0.6, roughness: 0.3, emissive: 0x0a2a3a, emissiveIntensity: 0.4 });
  const joint = new THREE.MeshStandardMaterial({ color: 0x11161d, metalness: 0.7, roughness: 0.5 });

  // Ground grid ring
  const grid = new THREE.GridHelper(14, 28, 0x244055, 0x172530);
  grid.position.y = 0; scene.add(grid);

  function seg(len, r) {
    const g = new THREE.Group();
    const bar = new THREE.Mesh(new THREE.BoxGeometry(r, len, r), metal);
    bar.position.y = len / 2; g.add(bar);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.8, r * 0.8, r * 1.2, 20), joint);
    cap.rotation.z = Math.PI / 2; cap.position.y = len; g.add(cap);
    g.userData.len = len;
    return g;
  }

  // Base
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.95, 0.4, 32), joint);
  base.position.y = 0.2; scene.add(base);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.35, 24), accent);
  collar.position.y = 0.5; scene.add(collar);

  // Arm chain
  const shoulder = new THREE.Group(); shoulder.position.y = 0.65; scene.add(shoulder);
  const s1 = seg(1.7, 0.34); shoulder.add(s1);
  const elbow = new THREE.Group(); elbow.position.y = 1.7; s1.add(elbow);
  const s2 = seg(1.4, 0.28); elbow.add(s2);
  const wrist = new THREE.Group(); wrist.position.y = 1.4; s2.add(wrist);

  // Gripper
  const hand = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.3, 20), accent);
  hand.position.y = 0.15; wrist.add(hand);
  const fingerGeo = new THREE.BoxGeometry(0.07, 0.4, 0.14);
  const f1 = new THREE.Mesh(fingerGeo, metal); f1.position.set(0.16, 0.42, 0); wrist.add(f1);
  const f2 = new THREE.Mesh(fingerGeo, metal); f2.position.set(-0.16, 0.42, 0); wrist.add(f2);

  // A little cube the arm "reaches" toward
  const cube = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4),
    new THREE.MeshStandardMaterial({ color: 0xffb454, metalness: 0.4, roughness: 0.4, emissive: 0x3a2400, emissiveIntensity: 0.5 }));
  cube.position.set(2.4, 0.2, 0.6); scene.add(cube);

  // Interaction
  const target = { x: 0.15, y: 0.1 };
  window.addEventListener('pointermove', (e) => {
    const r = mount.getBoundingClientRect();
    target.x = ((e.clientX - r.left) / r.width - 0.5) * 1.4;
    target.y = ((e.clientY - r.top) / r.height - 0.5) * 1.0;
  });

  const clock = new THREE.Clock();
  let raf;
  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // base slowly orients toward cursor x
    base.rotation.y = collar.rotation.y = shoulder.rotation.y =
      THREE.MathUtils.lerp(shoulder.rotation.y, target.x * 1.2, 0.05);

    // idle breathing + cursor-driven articulation
    s1.rotation.x = THREE.MathUtils.lerp(s1.rotation.x, 0.5 + target.y * 0.6 + Math.sin(t * 0.6) * 0.06, 0.05);
    elbow.rotation.x = THREE.MathUtils.lerp(elbow.rotation.x, -0.9 - target.y * 0.5 + Math.cos(t * 0.5) * 0.08, 0.05);
    wrist.rotation.x = THREE.MathUtils.lerp(wrist.rotation.x, -0.3 + Math.sin(t * 0.8) * 0.1, 0.05);

    // gripper open/close cycle
    const g = 0.12 + Math.abs(Math.sin(t * 0.9)) * 0.1;
    f1.position.x = g; f2.position.x = -g;

    cube.rotation.y = t * 0.4; cube.position.y = 0.2 + Math.sin(t * 1.2) * 0.03;

    renderer.render(scene, camera);
  }
  animate();

  function resize() {
    camera.aspect = W() / H(); camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  }
  window.addEventListener('resize', resize);

  // pause when offscreen (perf)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf); else animate();
  });
})();
