import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import LanguageRouteSync from './components/LanguageRouteSync'
import App from './App'
import './index.css'
import './i18n' // i18n initialization
import './utils/logger' // Production-safe console logging
import { ensureDevSeedElbaSerdar, ensureDevSeedTest1, ensureDevSeedAdmin } from './utils/devSeed'

// PWA: Service Worker
// DEV: Disable/unregister to avoid stale caches during rapid iteration.
// PROD: Register /sw.js (light caching)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (import.meta.env.DEV) {
      void navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => void r.unregister());
      });
      return;
    }
    void navigator.serviceWorker.register('/sw.js');
  });
}

// DEV-only: seed known Beta Partner users (idempotent)
ensureDevSeedAdmin();
ensureDevSeedElbaSerdar();
ensureDevSeedTest1();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <LanguageRouteSync />
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
