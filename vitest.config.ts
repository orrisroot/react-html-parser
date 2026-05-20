import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      index: path.resolve(__dirname, 'src', 'index.ts'),
      elementTypes: path.resolve(__dirname, 'src', 'elementTypes'),
      utils: path.resolve(__dirname, 'src', 'utils'),
      processNodes: path.resolve(__dirname, 'src', 'processNodes.ts'),
      convertNodeToElement: path.resolve(__dirname, 'src', 'convertNodeToElement.ts'),
      HtmlParser: path.resolve(__dirname, 'src', 'HtmlParser.ts'),
      VoidElements: path.resolve(__dirname, 'src', 'dom/elements/VoidElements.ts'),
      generatePropsFromAttributes: path.resolve(__dirname, 'src', 'utils/generatePropsFromAttributes.ts'),
      htmlAttributesToReact: path.resolve(__dirname, 'src', 'utils/htmlAttributesToReact.ts'),
      inlineStyleToObject: path.resolve(__dirname, 'src', 'utils/inlineStyleToObject.ts'),
      isEmptyTextNode: path.resolve(__dirname, 'src', 'utils/isEmptyTextNode.ts'),
      isValidTagOrAttributeName: path.resolve(__dirname, 'src', 'utils/isValidTagOrAttributeName.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['test/**/*.spec.{ts,tsx,js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
      reportsDirectory: 'coverage/',
      includeAllSources: true,
    },
  },
});
