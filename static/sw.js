// Ideal Magic Service Worker - SPA-Optimized Performance
const CACHE_NAME = 'ideal-magic-spa-v2.0';
const OFFLINE_PAGE = '/offline.html';

// Assets to cache immediately for SPA performance
const CRITICAL_ASSETS = [
  '/',
  '/docs/',
  '/docs/cards/',
  '/docs/gameplay/',
  '/docs/printing/',
  '/images/ideal-magic-PNG-circular-emblem.webp',
  '/favicon.ico',
  '/manifest.json',
  // SPA-specific assets
  '/assets/js/ideal-magic-spa.min.js',
  '/assets/js/ideal-magic-enhanced.min.js',
  '/assets/css/compiled/main.css'
];

// Cache strategies optimized for SPA
const CACHE_STRATEGIES = {
  images: 'cache-first',
  documents: 'stale-while-revalidate', // Faster for SPA navigation
  assets: 'cache-first',
  api: 'network-first',
  spa: 'cache-first' // SPA resources should be cached aggressively
};

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) return;
  
  // Skip POST requests and other non-GET requests
  if (request.method !== 'GET') return;
  
  event.respondWith(handleRequest(request, url));
});

async function handleRequest(request, url) {
  const strategy = getStrategy(url);
  
  try {
    switch (strategy) {
      case 'cache-first':
        return await cacheFirst(request);
      case 'network-first':
        return await networkFirst(request);
      case 'stale-while-revalidate':
        return await staleWhileRevalidate(request);
      default:
        return await networkFirst(request);
    }
  } catch (error) {
    console.warn('Request failed:', request.url, error);
    return await getOfflineFallback(request);
  }
}

function getStrategy(url) {
  // Images and static assets
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|eot)$/i)) {
    return 'cache-first';
  }
  
  // CSS and JS files
  if (url.pathname.match(/\.(css|js)$/i)) {
    return 'stale-while-revalidate';
  }
  
  // HTML documents
  if (url.pathname.endsWith('/') || url.pathname.endsWith('.html') || !url.pathname.includes('.')) {
    return 'network-first';
  }
  
  // API endpoints
  if (url.pathname.includes('/api/') || url.pathname.includes('/search/')) {
    return 'network-first';
  }
  
  return 'network-first';
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  
  if (cached) {
    // Update cache in background if older than 1 hour
    const cacheDate = new Date(cached.headers.get('date'));
    const now = new Date();
    const hoursSinceCache = (now - cacheDate) / (1000 * 60 * 60);
    
    if (hoursSinceCache > 1) {
      // Update in background
      updateCache(request);
    }
    
    return cached;
  }
  
  const response = await fetch(request);
  
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(CACHE_NAME);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  });
  
  return cached || fetchPromise;
}

async function updateCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response);
    }
  } catch (error) {
    console.warn('Background cache update failed:', request.url);
  }
}

async function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  // For navigation requests, return offline page
  if (request.mode === 'navigate') {
    const offlinePage = await caches.match(OFFLINE_PAGE);
    if (offlinePage) return offlinePage;
    
    // Fallback offline HTML
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ideal Magic - Offline</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            text-align: center; 
            padding: 2rem;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          }
          .logo { width: 80px; height: 80px; margin-bottom: 1rem; }
          .mana-colors { 
            background: linear-gradient(90deg, #006533, #264490, #E49506, #7E011E, #420161);
            height: 4px;
            border-radius: 2px;
            margin: 2rem 0;
          }
        </style>
      </head>
      <body>
        <img src="/images/ideal-magic-PNG-circular-emblem.webp" alt="Ideal Magic" class="logo">
        <h1>You're Offline</h1>
        <div class="mana-colors"></div>
        <p>No internet connection detected. Some cached pages may still be available.</p>
        <p>Please check your connection and try again.</p>
        <button onclick="location.reload()">Retry</button>
      </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }
  
  // For images, return a placeholder
  if (request.destination === 'image') {
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af">Image unavailable</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
  
  // For other requests, return error
  return new Response('Network error', {
    status: 408,
    headers: { 'Content-Type': 'text/plain' },
  });
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'form-submission') {
    event.waitUntil(processFormSubmissions());
  }
});

async function processFormSubmissions() {
  // Process any queued form submissions when back online
  // This would integrate with your form handling system
  console.log('Processing queued form submissions...');
}

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/images/ideal-magic-PNG-circular-emblem.webp',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Open Ideal Magic'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const url = event.notification.data.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Cleanup and optimization
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_CLEANUP') {
    cleanupOldCaches();
  }
  
  if (event.data && event.data.type === 'UPDATE_CACHE') {
    updateCriticalAssets();
  }
});

async function cleanupOldCaches() {
  const cacheWhitelist = [CACHE_NAME];
  const cacheNames = await caches.keys();
  
  return Promise.all(
    cacheNames.map((cacheName) => {
      if (!cacheWhitelist.includes(cacheName)) {
        console.log('Deleting cache:', cacheName);
        return caches.delete(cacheName);
      }
    })
  );
}

async function updateCriticalAssets() {
  const cache = await caches.open(CACHE_NAME);
  
  return Promise.all(
    CRITICAL_ASSETS.map(async (asset) => {
      try {
        const response = await fetch(asset);
        if (response.ok) {
          await cache.put(asset, response);
        }
      } catch (error) {
        console.warn('Failed to update asset:', asset);
      }
    })
  );
}