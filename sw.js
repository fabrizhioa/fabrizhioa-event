const cache_name = "cache-v1";
const urlsToCache = [
    //General
    './',
    './index.html',
    //Estilos
    './css/main.css',
    './css/fontawesome.css',
    //JavaScript
    './js/main.js',
    './js/vue.js',

    //Imagenes
    './img/Title.png',
    './img/icons/icon-512.png',
    './img/icons/icon-32.png',
    './img/wallpaper_1.jpg',
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
