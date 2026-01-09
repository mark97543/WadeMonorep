import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export const baseConfig = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // These aliases allow apps to import shared code easily
      '@wade-usa/sdk': path.resolve(__dirname, './packages/shared/sdk/index.ts'),
      '@wade-usa/ui': path.resolve(__dirname, './packages/shared/ui/src/index.ts'),
    },
  },
  // This ensures that the shared packages are processed by Vite
  optimizeDeps: {
    include: ['@wade-usa/sdk', '@wade-usa/ui'],
  },
});