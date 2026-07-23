import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (vishnu-alachi123.github.io) is served from the domain root,
// so the base path stays '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    // the three.js scene is intentionally a large, lazily-loaded chunk
    chunkSizeWarningLimit: 900,
  },
});
