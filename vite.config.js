import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  root: 'src',
  publicDir: 'public',
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        privacy: resolve(__dirname, 'src/privacy.html'),
      },
    },
  },
});
