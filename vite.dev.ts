import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactHtmlParser',
      formats: ['umd'],
      fileName: 'react-html-parser',
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
        dir: path.resolve(__dirname, 'dist'),
        entryFileNames: 'react-html-parser.js',
        exports: 'named',
      },
    },
  },
});
