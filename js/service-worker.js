// Service Worker simple pour L'Univers de Tim Burton
// Version basique avec cache essentiel

const CACHE_NAME = 'burton-universe-v1';

// Ressources à mettre en cache
const CACHE_ASSETS = [
    './',
    './index.html',
    './movies.html',
    './fun_facts.html',
    './sass/styles.css',
    './js/formulaire.js',
    './manifest.json'
];

// Installation - Met en cache les ressources de base
self.addEventListener('install', event => {
    console.log('Service Worker: Installation');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Mise en cache des fichiers');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch(error => console.error('Erreur cache:', error))
    );
});

// Activation - Nettoie les anciens caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activation');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Suppression ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Intercepation des requêtes - Cache first avec fallback réseau
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retourne le cache s'il existe, sinon va sur le réseau
                return response || fetch(event.request);
            })
            .catch(() => {
                // Si hors ligne et pas de cache, retourne une page basique
                if (event.request.destination === 'document') {
                    return caches.match('./index.html');
                }
            })
    );
});