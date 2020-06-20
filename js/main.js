/* if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log("registro de SW exitoso", res))
        .catch(err => console.log("error al registrar SW", err))
}
*/
vm0 = new Vue({
    el: "#app",
    data: {
        init:true,
        form: false,
        login: false,
        recovery: false,
        register: false,
        formdata: {
            user: '',
            name: '',
            password: '',
            email: ''
        },
        loginActive: 0
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
        },
        loginUser() {
            form = new FormData({
                "user": vm0.formdata.user,
                "pass": vm0.formdata.pass,
                "email": vm0.formdata.email,
                "name": vm0.formdata.name,
                "request": 1
            })

            fetch("http://192.168.0.102:8000/controller/login.php")
                .then((response)=>{
                    vm0.loginActive= 1;
                    alert("Ingreso Correcto");
                })
                .catch((err)=>{
                    console.log("Error al ingresar", err)
                })

        }
    }
})

