const CACHE_NAME = 'oren-shopping-v1';
// רשימת הקבצים שהאפליקציה תשמור בזיכרון של הטלפון
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js'
];

// התקנת ה-Service Worker ושמירת הקבצים בזיכרון (Cache)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// הפעלת האפליקציה מהזיכרון המקומי כשאין אינטרנט
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});