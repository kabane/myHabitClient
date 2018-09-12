<template>
  <div>
    <ul class="alert_message">
      <li class="todo" v-for="(message) in valid_messages" v-bind:key=message.index>
        {{message}}
      </li>
    </ul>
    <section class="todo_form">
      <p>Todoを入力してください</p>
      <input v-model="text" type="text" class="todo_form_field">
      <button v-on:click="add()">作成</button>
    </section>
    <section class="todo-active">
			<h2>タスク一覧</h2>
			<ul class="todo_list">
				<li class="todo" v-for="(todo) in getDoingTodo()" :key="todo.id">
          <todo :todo="todo" @activateTodo="activateTodo" @failActivateTodo="failActivateTodo"></todo>
				</li>
			</ul>
	</section>
  <section class="todo-done">
			<h2>完了タスク一覧</h2>
			<ul class="todo_list">
				<li class="todo" v-for="(todo) in getDoneTodo()" :key="todo.id">
          <done-todo :todo="todo"></done-todo>
				</li>
			</ul>
	</section>
  </div>
</template>

<script>
  import Todo from './Todo.vue'
  import DoneTodo from './DoneTodo.vue'
  export default {
    name: 'todo-app',
    components: {
      Todo,
      DoneTodo
    },
    data: function () {
      return {
        valid_messages: [],
        text: '',
        todos: []
      }
    },
    methods: {
      add: function () {
        var _this = this
        var index = _this.todos.length
        var todo = {
          id: index,
          name: _this.text,
          elapsed_time: 0,
          status: _this.$store.getters.statusReady
        }
        this.todos.push(todo)
        this.text = ''
        return todo
      },
      getDoingTodo () {
        var i = 0
        var results = []
        var todo

        for (i; i < this.todos.length; i++) {
          todo = this.todos[i]
          if (todo.status !== this.$store.getters.statusDone) {
            results.push(todo)
          }
        }

        return results
      },
      getDoneTodo () {
        var i = 0
        var results = []
        var todo

        for (i; i < this.todos.length; i++) {
          todo = this.todos[i]
          if (todo.status === this.$store.getters.statusDone) {
            results.push(todo)
          }
        }

        return results
      },
      // Callbacks
      activateTodo (todo) {
        var validMessages = [
          todo.name + 'を開始しました'
        ]
        this.$store.commit('updateCurrentTodo', todo)
        this.createValidMessage(validMessages)
      },
      failActivateTodo () {
        var validMessages = [
          '現在進行中のタスクが存在します',
          '新たにタスクを開始するには、進行中のタスクを完了するか中断してください'
        ]
        this.createValidMessage(validMessages)
      },
      createValidMessage (messages) {
        for(var i = 0; i < this.valid_messages.length; i++) {
          this.valid_messages.splice(i, 1)  
        }
        var count = messages.length
        if (count === 0) return
        for (var i = 0; i < count; i++) {
          this.$set(this.valid_messages, i, messages[i])
        }

        setInterval(function () {
          this.valid_messages = []
        }, 3000)
      }
    }
  }
</script>

<style>

</style>
