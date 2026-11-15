import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: { manualChunks: { phaser: ['phaser'] } },
    },
    // Phaser incluye el motor completo en un único chunk del proveedor.
    chunkSizeWarningLimit: 1600,
  },
});
