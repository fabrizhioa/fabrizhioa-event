const cache_name = "cache-v1";
const urlsToCache = [
    './',
    './css/main.css',
    './js/main.js',
    './img/Title.png',
]

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cache_name)
            .then (function(cache){
                console.log('Cache Open');
                return cache.addAll(urlsToCache);
            })
    )
})

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if(response){
                    return response;
                }
                return fetch(event.request);
            })
    )
})