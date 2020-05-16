(function() {
    'use strict';
    // two way data binding (to UI)
    const vm = new Vue({
        el: '#app',
        data: {
            newItem: '',
            todos: []
        },
        // dataの変更監視⇨watch
        watch: {
            // todos: function() {
                // このままだとデータの中身も含めての監視ではないので、deep watcherという仕組みを利用する必要がある
            //     localStorage.setItem('todos', JSON.stringify(this.todos));
            //     alert('Data saved!');
            // }
            todos: {
                handler: function() {
                localStorage.setItem('todos', JSON.stringify(this.todos));
                },
                deep: true
            }
        },
        // detaの読み出し⇨mounted
        mounted: function() {
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        },
        methods: {
            addItem: function() {
                let item = {
                    title: this.newItem,
                    isDone: false
                };
                // このdata:todosの中にnewItemを追加
                // 既定のページが遷移する事を防ぐpreventdefault
                // e.preventDefault();
                this.todos.push(item);
                this.newItem = '';
            },
            deleteItem: function(index) {
                if (confirm('are you sure?')) {
                    this.todos.splice(index, 1);
                    }
            },
            purge: function() {
                if (!confirm('can you delete all?')) {
                    return;
                    }
                    this.todos = this.remaining;
                }
            },
            computed: {
                remaining: function() {
                  // var items = this.todos.filter(function(todo) {
                  //   return !todo.isDone;
                  // });
                  // return items.length;
                  return this.todos.filter(function(todo) {
                    return !todo.isDone;
                  });
                }
              }
            });
          })();