var app = new Vue({
    el: "#app",
    data: {
        key: '',
        title: '',
        description: '',
        lista: [],
        searchText:''
    },
    computed: {
        filteredList:function(){
            var arrayFilter = this.lista;
            var queryText = this.searchText;

            if(queryText !== ""){
                arrayFilter = arrayFilter.filter(function(obj){
                    return (
                        obj.title.toLowerCase() + '' + obj.description.toLowerCase()
                    ).indexOf(queryText.toLowerCase()) > -1
                });
            }
            return arrayFilter;
        }
    },
    methods: {
        create: function (key, title, description) {
            var item = {
                key: key,
                title: title,
                description: description
            }
            app.lista.push(item);
        },
        deleteItem: function (key) {
            var index = app.lista.map(function(obj){
                return obj.key;
            }).indexOf(key)
            app.lista.splice(index,1);
        }
    }
})