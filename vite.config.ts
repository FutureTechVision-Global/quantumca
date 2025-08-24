import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ✅ Important for GitHub Pages
  base: '/quantumca/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // cleaner imports (e.g. @/components)
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'], // prevent unnecessary pre-bundling
  },

  build: {
    outDir: 'dist',     // GitHub Pages expects dist/
    assetsDir: 'assets',
    sourcemap: false,   // can enable if debugging prod builds
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // main entry
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // keeps vendor bundle separate
        },
      },
    },
  },

  server: {
    port: 3000,
    open: true, // auto-open browser on dev
  },
});
