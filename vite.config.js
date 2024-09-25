import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),  // This is optional for compatibility
    },
    server: {
      host: '0.0.0.0',  // Make the server accessible externally
      port: process.env.PORT || 8080,  // Use Render's provided port or default to 8080
    },
  };
});
