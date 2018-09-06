<template>
  <div>
    <ul class="alert_message">
      <li class="todo" v-for="(message) in valid_messages">
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
				<li class="todo" v-for="(todo) in get_doing_todo()" :key="todo.id">
          <todo :todo="todo" :config="config.todo"></todo>
				</li>
			</ul>
	</section>
  <section class="todo-done">
			<h2>完了タスク一覧</h2>
			<ul class="todo_list">
				<li class="todo" v-for="(todo) in get_done_todo()" :key="todo.id">
          <done-todo :todo="todo" :config="config.todo" :current="current_todo"></done-todo>
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
        todos: [],
        current_todo: null,
        config: {
          todo: {
            status: {
              'ready': 0,
              'doing': 1,
              'stop': 2,
              'done': 3
            }
          }
        }
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      add: function () {
        var _this = this
        var index = _this.todos.length
        this.todos.push({
          id: index,
          name: _this.text,
          elapsed_time: 0,
          status: _this.config.todo.status['ready']
        })
        this.text = ''
      },
      get_doing_todo () {
        var i = 0
        var results = []
        var todo

        for (i; i < this.todos.length; i++) {
          todo = this.todos[i]
          if (todo.status !== this.config.todo.status['done']) {
            results.push(todo)
          }
        }

        return results
      },
      get_done_todo () {
        var i = 0
        var results = []
        var todo

        for (i; i < this.todos.length; i++) {
          todo = this.todos[i]
          if (todo.status === this.config.todo.status['done']) {
            results.push(todo)
          }
        }

        return results
      },
      // Callback
      activate_todo (todo) {
        var validMessages = [
          todo.name + 'を開始しました'
        ]

        this.current_todo = todo
        this.create_valid_message(validMessages)
      },
      fail_activate_todo () {
        var validMessages = [
          '現在進行中のタスクが存在します',
          '新たにタスクを開始するには、進行中のタスクを完了するか中断してください'
        ]

        this.create_valid_message(validMessages)
      },
      create_valid_message (messages) {
        var i = 0
        var count = messages.length
        if (count === 0) return
        for (i; i < count; i++) {
          this.valid_messages[i] = messages[i]
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
