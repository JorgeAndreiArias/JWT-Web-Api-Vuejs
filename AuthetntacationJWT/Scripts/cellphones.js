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
            auth = {
                headers: { Authorization: 'Bearer ' + localStorage.jwt }
            }
            axios.get('api/cellphone?Id=' + id, auth).then(response => { //aqui utilizo la librería de axios
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
            auth = {
                headers: { Authorization: 'Bearer ' + localStorage.jwt }
            };
            axios.post('api/put', obj, auth).then(response => { //aqui utilizo la librería de axios
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
            auth = {
                headers: { Authorization: 'Bearer ' + localStorage.jwt }
            };
            axios.post('api/post', obj, auth).then(response => { //aqui utilizo la librería de axios
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
            auth = {
                headers: { Authorization: 'Bearer ' + localStorage.jwt }
            };
            axios.post('api/delete', obj, auth).then(response => { //aqui utilizo la librería de axios
                this.leerAPI();
            }).catch(e => {
                alert(e);
            })
            // Do stuff with res here.
        },
        leerAPI() { //Esta el la logica de mi metodo
            auth = {
                headers: { Authorization: 'Bearer ' + localStorage.jwt }
            };
            axios.get('api/cellphone', auth).then(response => { //aqui utilizo la librería de axios
                this.CellPhone = response.data;
            }).catch(e => {
                alert(e);
            })
        }
    },

})