import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      ui: path.resolve(__dirname, './src/design-system'),
    },
  },
  build: { sourcemap: false },
  server: {
    port: 3030,
  },
  preview: {
    port: 8080,
  },
});
