import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bellerophon',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
  },
});
