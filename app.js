var app = new Vue({
    el: "#app",
    data: {
        key: '',
        title: '',
        description: '',
        lista: [],
        searchText: ''
    },
    computed: {
        filteredList: function () {
            var arrayFilter = this.lista;
            var queryText = this.searchText;

            if (queryText !== "") {
                arrayFilter = arrayFilter.filter(function (obj) {
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
            firebase.database().ref("hobbies/" + key).set(item);
            app.listReload();
        },
        deleteItem: function (key) {
            firebase.database().ref("hobbies/" + key).remove();
            app.listReload();
        },
        listReload: function(){
            app.lista = [];
            app.listItems();
        },
        listItems: function(){
            var elementsToLoad = firebase.database().ref('hobbies');

            elementsToLoad.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    app.lista.push(childData);
                });
            });
        }
    },

    //Parece que "created" es una palabra reservada
    created: function ()
    {
       this.listItems();
    }
})