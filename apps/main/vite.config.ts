import { baseConfig } from '../../vite.config.base';
import { mergeConfig } from 'vite';
import path from 'path';

export default mergeConfig(baseConfig, {
  resolve: {
    // 1. Keep your aliases (This points to the folders)
    alias: {
      react: path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
      '@wade-usa/auth': path.resolve(__dirname, '../../packages/shared/auth/src'),
      '@wade-usa/ui': path.resolve(__dirname, '../../packages/shared/ui/src'),
    },
    // 2. Add Dedupe (Safety net)
    dedupe: ['react', 'react-dom', '@wade-usa/auth'],
  },
  
  // 3. THE MISSING PIECE: OPTIMIZE DEPS
  optimizeDeps: {
    // Tell Vite: "Don't cache these, I am editing them right now"
    exclude: ['@wade-usa/auth', '@wade-usa/ui'],
  },

  server: {
    port: 5173,
    strictPort: true,
  },
});