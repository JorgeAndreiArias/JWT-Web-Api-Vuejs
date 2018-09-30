Vue.component('modal', {
    template: '#modal-template',
    methods: {
    Logout() {
        localStorage.jwt = '';
        window.location.href = "login.html";
    },
    resetTime() {
        vm.changes = 5;
        vm.resetTime()
    }

    }
    
})

var vm = new Vue({
    el: '#app',
    mounted: function () {
        this.leerAPI() //Implementando mi 
        this.keys()
        this.mousemove()
        this.mouseclick()
    }, created: function () {
        this.setTime()
    },
    data: {
        CellPhone: [],
        //Este es el objeto que se va a retornar lleno al momento de ejecutar el metodo get
        name: '',
        brand: '',
        price: '',
        firmware: '',
        id: '',
        contador: 5,
        showModal: false,
        t: '',
        auth: { "headers": { "Authorization": 'Bearer ' + localStorage.jwt }}
    },
    computed: {
        changes: {
            get: function () {
                return this.contador;
            },
            set: function (v) {
                this.contador = v;
            }
        }, 
        modal: {
            get: function () {
                return this.showModal;
            },
            set: function (v) {
                this.showModal = v;
            }
        },
        interval: {
            get: function () {
                return this.t;
            },
            set: function (v) {
                this.t = v;
            }
        },
        head: {
            get: function () {
                return this.auth;
            },
            set: function (v) {
                this.auth = v;
            }
        }
    },
    methods: {
        keys: function () {
            window.addEventListener("keypress", function () {
                this.resetTime();
                this.setTime();
            }.bind(this));
        },
        mouseclick: function () {
            window.addEventListener("click", function () {
                this.resetTime();
                this.setTime();
            }.bind(this))
        },
        mousemove: function () {
            window.addEventListener("mousemove", function () {
                this.resetTime();
                this.setTime();
            }.bind(this))
        },
        setTime: function () {
            clearInterval(this.interval);
            const self = this;
            var aux = this.changes;
            
            this.interval = setInterval(function () {
                if (aux != 0) {
                    aux--;
                }
                self.changes = aux;
                if (aux == 0) {
                    self.modal = true;
                }
            }, 1000);

            
        },
        resetTime: function () {
            const self = this;
            self.changes = 5;
        },
        Logout() {
            localStorage.jwt = '';
            window.location.href = "login.html";
        },
        GetById(id) {
            axios.get('api/cellphone?Id=' + id, this.head).then(response => { //aqui utilizo la librería de axios
                var papas = JSON.stringify(response);
                alert(papas);
                this.CellPhone = response.data;
            }).catch(e => {
                alert(e);
            })
            // Do stuff with res here.
        },
        Put(id, name, brand, price, firmware) {
            obj = {
                "Id": id,
                "Name": name,
                "Brand": brand,
                "Price": price,
                "Firmware": firmware,
            };

            axios.post('api/put', obj, this.head).then(response => { //aqui utilizo la librería de axios
                this.leerAPI();
            }).catch(e => {
                alert(e);
            })
            // Do stuff with res here.
        },
        Post(name, brand, price, firmware) {
            obj = {
                "Name": name,
                "Brand": brand,
                "Price": price,
                "Firmware": firmware,
            };

            axios.post('api/post', obj, this.head).then(response => { //aqui utilizo la librería de axios
                this.leerAPI();
            }).catch(e => {
                alert(e);
            })
            // Do stuff with res here.
        },
        Delete(id) {
            obj = {
                "Id": id,
            };

            axios.post('api/delete', obj, this.head).then(response => { //aqui utilizo la librería de axios
                this.leerAPI();
            }).catch(e => {
                alert(e);
            })
            // Do stuff with res here.
        },
        leerAPI() { //Esta el la logica de mi metodo

            axios.get('api/cellphone', this.head).then(response => { //aqui utilizo la librería de axios
                this.CellPhone = response.data;
            }).catch(e => {
                alert(e);
            })
        }
    },

})