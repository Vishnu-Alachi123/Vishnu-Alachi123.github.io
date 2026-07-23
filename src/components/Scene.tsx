import { useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const REDUCE =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CYAN = '#52c7ff';
const INK = '#dce3ec';

/** Slowly rotating wireframe icosahedron + a drifting particle field. */
function Mesh() {
  const objs = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(2.1, 1);
    const line = new THREE.LineSegments(
      new THREE.EdgesGeometry(ico),
      new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.55 }),
    );
    const verts = new THREE.Points(ico, new THREE.PointsMaterial({ color: INK, size: 0.06 }));

    // spherical shell of drifting particles
    const N = 170;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 3 + Math.random() * 5;
      const a = Math.random() * Math.PI * 2;
      const b = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(b) * Math.cos(a);
      pos[i * 3 + 1] = r * Math.sin(b) * Math.sin(a);
      pos[i * 3 + 2] = r * Math.cos(b);
    }
    const fg = new THREE.BufferGeometry();
    fg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const field = new THREE.Points(
      fg,
      new THREE.PointsMaterial({ color: CYAN, size: 0.04, transparent: true, opacity: 0.5 }),
    );

    return { ico, line, verts, field };
  }, []);

  // dispose GPU resources on unmount
  useEffect(() => {
    return () => {
      objs.ico.dispose();
      objs.line.geometry.dispose();
      (objs.line.material as THREE.Material).dispose();
      (objs.verts.material as THREE.Material).dispose();
      objs.field.geometry.dispose();
      (objs.field.material as THREE.Material).dispose();
    };
  }, [objs]);

  useFrame((state) => {
    if (REDUCE) return;
    const t = state.clock.elapsedTime;
    const { x: px, y: py } = state.pointer;

    objs.line.rotation.y = t * 0.12 + px * 0.5;
    objs.line.rotation.x = -py * 0.35 + Math.sin(t * 0.3) * 0.08;
    objs.verts.rotation.copy(objs.line.rotation);
    objs.field.rotation.y = t * 0.03;

    const cam = state.camera;
    cam.position.x += (px * 0.5 - cam.position.x) * 0.05;
    cam.position.y += (py * 0.5 - cam.position.y) * 0.05;
    cam.lookAt(0, 0, 0);
  });

  return (
    <group rotation={REDUCE ? [0.35, 0.6, 0] : [0, 0, 0]}>
      <primitive object={objs.line} />
      <primitive object={objs.verts} />
      <primitive object={objs.field} />
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={REDUCE ? 'demand' : 'always'}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, touchAction: 'pan-y' }}
    >
      <Mesh />
    </Canvas>
  );
}
