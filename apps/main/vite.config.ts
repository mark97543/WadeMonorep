import { baseConfig } from '../../vite.config.base';
import { mergeConfig } from 'vite';

export default mergeConfig(baseConfig, {
  server: {
    port: 5173, // Main site stays on 5173
  },
});