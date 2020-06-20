const cache_name = "wac-cache-v1";
urlsToCache = [
    //General
    './',
    './index.html',
    //Estilos
    './css/main.css',
    //JavaScript
    './js/main.js',
    './js/vue.js',

    //Imagenes
    './img/Title.png',
    './img/icons/icon-512.png',
    './img/icons/icon-32.png',
    './img/Wallpaper_1.jpg',
]
//durante la fase de instalacion, generalmente se almacena en cache los activos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cache_name)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then( () => self.skipWaiting())
                    .catch(err=> console.log('error agregando cache', err))
            })
    )
})
//una vez que se instala el sw, se activa y busca los recursospara hacer funcionar sin conexion
self.addEventListener('activate', e => {
    const cacheWhitelist = [cache_name]

    e.waitUntil(
        caches.keys()
        .then(cachesNames =>{
            cachesNames.map(cacheName =>{
                if(cacheWhitelist.indexOf(cacheName) === -1){
                    return caches.delete(cacheName)
                }
            })
        })
        .then(()=> self.clients.claim())
    )
})

self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en cache o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
            .then( res => {
                if(res){
                    //recuperar del cache
                    return res
                }
                //recuperar de la peticion a la url
                return fetch(e.request)
            })
    )
})

