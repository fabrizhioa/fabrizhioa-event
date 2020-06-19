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

window.onload = (e) => { 
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
    });
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  }