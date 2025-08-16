import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker kaydı - PWA için geliştirilmiş
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker başarıyla kaydedildi:', registration.scope);
        
        // Güncellemeleri kontrol et
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🔄 Yeni içerik mevcut; sayfayı yenileyin.');
                // Kullanıcıya bildirim gösterilebilir
                if (confirm('Yeni sürüm mevcut. Sayfayı yenilemek ister misiniz?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('❌ Service Worker kaydı başarısız:', error);
      });
  });
  
  // PWA yükleme olaylarını dinle
  let deferredPrompt: any;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('💾 PWA yükleme istemi hazır');
  });
  
  window.addEventListener('appinstalled', () => {
    console.log('🎉 PWA başarıyla yüklendi');
    deferredPrompt = null;
  });
}
