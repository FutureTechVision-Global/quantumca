import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/quantumca/', // ✅ Required for GitHub Pages (repo name)

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // optional: clean imports like @/components
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'], // keeps bundle lean
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // ✅ entry
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
