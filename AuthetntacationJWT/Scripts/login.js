var vm = new Vue({
    el: '#app',
    data: {
        nick: 'MurdockDev',
        password: 'Papasconqueso',
        jwt: '',
        /*
         * https://alligator.io/vuejs/vue-jwt-patterns/
        */
    },
    methods: {
        Auth(nick, password) {
            ob = {
                "Nick": nick,
                "Password": password
            }
            axios.post('api/usuarios/authenticate', ob ).then(response => {
                this.jwt = response.data;
                localStorage.jwt = this.jwt;
                alert(JSON.stringify(response.data))
                window.location.href = "cellphones.html";
                
            }).catch(e => {
                alert("Error: Incorrect username or password")
            })
        }
    },
})