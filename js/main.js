if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('./sw.js')
        .then(()=>{
            console.log('Service Worker registered');
        })
        .catch((e)=>{
            console.log('Service Worker Failed :(', e)
        })
    })
}