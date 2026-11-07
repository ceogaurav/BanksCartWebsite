import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/ifsc-proxy': {
        target: 'https://ifsc.razorpay.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ifsc-proxy/, ''),
      },
      '/api/pincode-proxy': {
        target: 'https://api.postalpincode.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pincode-proxy/, ''),
      },
    },
  },
});
