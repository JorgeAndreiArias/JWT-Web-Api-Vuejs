new Vue({
    el: '#app',
    mounted: function () {
        this.leerAPI() //Implementando mi funcion
    },
    data: {
        CellPhone: [],
        //Este es el objeto que se va a retornar lleno al momento de ejecutar el metodo get
        name: '',
        brand: '',
        price: '',
        firmware: '',
        id: '',       
    },
    methods: {
        
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
                var papas = JSON.stringify(response);
                alert(papas);
                this.CellPhone = response.data;
            }).catch(e => {
                alert(e);
            })
        }
    },

})