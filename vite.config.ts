import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  /*
  server: {
    proxy: {
      '/apis': {
        target: 'http://apis.data.go.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, ''),
      },
    },
  },*/
});
