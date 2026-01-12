import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Some transitive deps include Node built-ins (e.g. require("https")).
  // They are not meant for the browser bundle; excluding them avoids Vite dep-prebundle crashes in dev.
  optimizeDeps: {
    exclude: ['gaxios', 'agent-base', 'google-auth-library', 'firebase-admin'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // OTOMATIK YENİLEME - Her değişiklikte View ekranı yenilensin
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      overlay: true, // Hata olursa ekranda göster
    },
    watch: {
      usePolling: true, // Dosya değişikliklerini her zaman yakala
      interval: 100, // 100ms'de bir kontrol et
    },
  },
  // Cache'i minimum tut - her zaman taze veri
  cacheDir: '.vite',
})
