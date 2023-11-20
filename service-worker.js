// service-worker.js
const CACHE_NAME = 'rental-mobil-cache';
const urlsToCache = [
  '/RentalMobilAlkarizqy.github.io/',
  'index.html',
  'style.css',
  'script.js',
  // tambahkan file-file lain yang perlu di-cache
];

self.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  console.log("masuk");
  deferredPrompt = e;
  showInstallPromotion();
});

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
      .then(self.skipWaiting())
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request);
      });
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[ServiceWorker] Hapus cache lama", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});