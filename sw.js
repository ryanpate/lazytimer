// LazyTimer Service Worker v4.0 - PWA prompt on all pages
const CACHE_NAME = 'lazytimer-v4';

// Assets to cache for offline use
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/pomodoro-timer.html',
  '/cooking-timer.html',
  '/meditation-timer.html',
  '/workout-timer.html',
  '/study-timer.html',
  '/breathing-timer.html',
  '/1-minute-timer.html',
  '/2-minute-timer.html',
  '/3-minute-timer.html',
  '/4-minute-timer.html',
  '/5-minute-timer.html',
  '/7-minute-timer.html',
  '/8-minute-timer.html',
  '/10-minute-timer.html',
  '/15-minute-timer.html',
  '/20-minute-timer.html',
  '/25-minute-timer.html',
  '/30-minute-timer.html',
  '/40-minute-timer.html',
  '/45-minute-timer.html',
  '/50-minute-timer.html',
  '/60-minute-timer.html',
  '/90-minute-timer.html',
  '/1-hour-timer.html',
  '/2-hour-timer.html',
  '/countdown-timer.html',
  '/stopwatch.html',
  '/sleep-timer.html',
  '/egg-timer.html',
  '/all-timers.html',
  '/stopwatch.png',
  '/icon-192.png',
  '/static/digital-clock-beep.wav',
  '/static/vintage-warning-alarm.wav',
  '/static/facility-breach-alarm.wav'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('LazyTimer: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Activate immediately without waiting
        return self.skipWaiting();
      })
      .catch((error) => {
        console.log('LazyTimer: Cache failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('LazyTimer: Deleting old cache', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests (ads, analytics, etc.)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version
          return cachedResponse;
        }

        // Not in cache - fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Don't cache if not a valid response
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // Clone the response (can only be consumed once)
            const responseToCache = networkResponse.clone();

            // Cache the fetched response for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // Network failed and not in cache
            // For HTML pages, return the cached index as fallback
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
            return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
          });
      })
  );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
