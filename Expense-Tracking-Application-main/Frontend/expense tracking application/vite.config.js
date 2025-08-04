import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // <<< FIX HERE: Add the entire 'server' block below
  server: {
    proxy: {
      // String shorthand: '/api' -> 'http://localhost:8000/api'
      '/api': {
        target: 'http://localhost:8000', // <-- IMPORTANT: Change this if your backend runs on a different port
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false,      // Set to false if you're not using HTTPS
      }
    }
  }
})