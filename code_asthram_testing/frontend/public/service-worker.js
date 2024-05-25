const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
            .catch(error => {
                console.error('Failed to install service worker:', error);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request);
            })
        );
    } else {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(event.request).then(response => {
                    var fetchPromise = fetch(event.request).then(networkResponse => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                    return response || fetchPromise;
                });
            })
        );
    }
});

self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

async function syncData() {
    const dataToSync = await getCachedData(); // Placeholder for your data fetching logic
    try {
        const response = await fetch('api/data-sync', {
            method: 'POST',
            body: JSON.stringify(dataToSync),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('Data synced successfully');
            clearCachedData(); // Placeholder for clearing your local cache if needed
        }
    } catch (error) {
        console.error('Failed to sync data:', error);
    }
}

self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/icon.png'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
