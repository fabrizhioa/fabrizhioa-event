if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(() => {
                console.log('Service Worker registered');
            })
            .catch((e) => {
                console.log('Service Worker Failed :(', e)
            })
    })
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e)=>{
        e.preventDefault();
        deferredPrompt = e;
    })
}

vm0 = new Vue({
    el: "#app",
    data: {
        init:true,
        form: false,
        login: false,
        recovery: false,
        register: false
    },

    methods: {
        viewReg() {
            vm0.init = false
            vm0.form = true
            vm0.login = false
            vm0.recovery = false
            vm0.register = true
        },
        viewLog() {
            vm0.init = false
            vm0.form = true
            vm0.login = true
            vm0.recovery = false
            vm0.register = false
        },
        viewRec() {
            vm0.init = false
            vm0.form = true
            vm0.login = false
            vm0.recovery = true
            vm0.register = false
        }
    }
})

