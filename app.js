Vue.component('mi-primer-componente', {
    props: ['message'],
    methods: {
        sayHi: function(value){
            alert("Hola " +value);
        }
    },
    template: '<div class="alert alert-primary" role="alert"><button class="btn btn-secondary" v-on:click="sayHi(message)">El botón</button>{{message}}</div>'
})
var app = new Vue({
    el: "#app",
    data: {

    }
})