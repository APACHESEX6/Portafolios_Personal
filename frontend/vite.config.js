import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    // Code splitting optimizado
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk para librerías grandes
          'react-vendor': ['react', 'react-dom'],
          'lucide-vendor': ['lucide-react'],
          'axios-vendor': ['axios'],
        },
      },
    },
    // Minificación agresiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.logs en producción
        drop_debugger: true,
      },
    },
    // Optimizar chunks
    chunkSizeWarningLimit: 1000,
    // Source maps solo para desarrollo
    sourcemap: false,
  },
  
  // Optimizaciones de desarrollo
  server: {
    open: true, // Abrir navegador automáticamente
    hmr: {
      overlay: false, // Menos overhead
    },
  },
  
  // Optimizar dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'axios', 'lucide-react'],
  },
})
