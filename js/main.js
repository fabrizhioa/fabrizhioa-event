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
}

vm0 = new Vue({
    el: "#app",
    data: {
        form: true,
        login: true,
        recovery: false,
        register: false
    },

    methods: {
        viewReg() {
            vm0.form = true
            vm0.login = false
            vm0.recovery = false
            vm0.register = true
        },
        viewLog() {
            vm0.form = true
            vm0.login = true
            vm0.recovery = false
            vm0.register = false
        },
        viewRec() {
            vm0.form = true
            vm0.login = false
            vm0.recovery = true
            vm0.register = false
        }
    }
})

