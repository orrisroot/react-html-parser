import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: false,
  target: 'es2019',
  outDir: 'dist',
  deps: {
    neverBundle: ['react', 'htmlparser2'],
  },
});
