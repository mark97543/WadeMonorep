import { baseConfig } from '../../vite.config.base';
import { mergeConfig } from 'vite';
import path from 'path'; // Add this import

export default mergeConfig(baseConfig, {
  resolve: {
    alias: {
      // Force all imports of React to use the one in apps/main
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  server: {
    port: 5173,
    strictPort:true,
  },
});