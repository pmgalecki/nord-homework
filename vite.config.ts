/// <reference types="vitest/config" />

import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import babel from 'vite-plugin-babel';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults'],
      additionalLegacyPolyfills: [
        'regenerator-runtime/runtime',
        'core-js/features/array/find',
        'core-js/features/array/includes',
        'core-js/features/number/is-nan',
        'core-js/features/promise',
        'core-js/features/object/assign',
        'core-js/features/symbol',
      ],
    }),
    babel({
      babelConfig: {
        presets: ['@babel/preset-env'],
        targets: { ie: '11' },
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
  },
} as UserConfig);
