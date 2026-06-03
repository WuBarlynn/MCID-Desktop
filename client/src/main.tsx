import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

window.addEventListener('error', (e) => {
  document.body.innerHTML += `<div style="color:red;z-index:9999;position:absolute;top:0;">${e.error?.stack || e.message}</div>`;
});
window.addEventListener('unhandledrejection', (e) => {
  document.body.innerHTML += `<div style="color:red;z-index:9999;position:absolute;top:0;">Promise Rejection: ${e.reason?.stack || e.reason}</div>`;
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
