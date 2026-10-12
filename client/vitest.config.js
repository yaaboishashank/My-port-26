import { defineConfig } from 'vitest/config';

// Vitest 3 uses its own Vite transformer; explicitly use React's automatic JSX runtime.
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: { environment: 'jsdom', setupFiles: './src/test/setup.js', css: false },
});
