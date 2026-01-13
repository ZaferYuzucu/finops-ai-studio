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
import { ensureDevSeedElbaSerdar, ensureDevSeedTest1, ensureDevSeedAdmin, seedElbaThermostatDashboard } from './utils/devSeed'

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

// Seed users (idempotent with flags)
if (import.meta.env.DEV) {
  ensureDevSeedAdmin();
  ensureDevSeedTest1();
}

// ✅ BETA PHASE: Elba Partner her environment'da seed'lenir
ensureDevSeedElbaSerdar();
// 🎯 REHBER TEST: Elba Termostat Dashboard
seedElbaThermostatDashboard();

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
