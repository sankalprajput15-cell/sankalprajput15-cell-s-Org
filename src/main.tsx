import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safeguard against getter-only window.fetch reassignment errors from third-party scripts/polyfills
try {
  let customFetch = window.fetch;
  
  // Define setter/getter on window instance if possible
  Object.defineProperty(window, 'fetch', {
    get() {
      return customFetch;
    },
    set(v) {
      if (typeof v === 'function') {
        customFetch = v;
      }
    },
    configurable: true,
    enumerable: true
  });
} catch (e) {
  // Ignore
}

try {
  let protoFetch = window.fetch;
  Object.defineProperty(Window.prototype, 'fetch', {
    get() {
      return protoFetch;
    },
    set(v) {
      if (typeof v === 'function') {
        protoFetch = v;
      }
    },
    configurable: true,
    enumerable: true
  });
} catch (e) {
  // Ignore
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

