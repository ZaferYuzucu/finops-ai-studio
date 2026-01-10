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

// PWA: register Service Worker
// - In PROD: /sw.js (light caching)
// - In DEV: /sw-dev.js (no caching, only for installability tests)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const sw = import.meta.env.DEV ? '/sw-dev.js' : '/sw.js';
    void navigator.serviceWorker.register(sw);
  });
}

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
