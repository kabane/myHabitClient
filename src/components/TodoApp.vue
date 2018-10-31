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
      <select v-model="category_id">
        <option value="" selected>カテゴリー選択</option>
        <option v-for="(category) in this.getCategories" :key="category._id" :value="category._id">
          {{ category.name }}
        </option>
      </select>
      <button v-on:click="add()">作成</button>
    </section>
    <section class="todo-active">
			<h2>タスク一覧</h2>
			<ul class="todo_list">
				<li class="todo" v-for="(todo) in this.doingTodos" :key="todo._id">
          <doing-todo :todo="todo" @activateTodo="activateTodo" @failActivateTodo="failActivateTodo"></doing-todo>
				</li>
			</ul>
	</section>
  <section class="todo-done">
			<h2>完了タスク一覧</h2>
			<ul class="todo_list">
				<li class="todo" v-for="(todo) in this.doneTodos" :key="todo._id">
          <done-todo :todo="todo"></done-todo>
				</li>
			</ul>
	</section>
  </div>
</template>

<script>
  import DoingTodo from './DoingTodo.vue'
  import DoneTodo from './DoneTodo.vue'
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  export default {
    name: 'todo-app',
    components: {
      DoingTodo,
      DoneTodo
    },
    data: function () {
      return {
        valid_messages: [],
        text: '',
        todos: [],
        category_id: '',
      }
    },
    computed: {
      ...mapGetters({
        doingTodos: 'doingTodos',
        doneTodos: 'doneTodos',
        getCategories: 'categories'
      })
    },
    methods: {
      add: function () {
        var _this = this,
            params = new URLSearchParams({
              name: _this.text,
              elapsed_time: 0,
              status: _this.$store.getters.statusReady,
              category_id: _this.category_id
            })

        axios.post(
          'http://localhost:3000/todos/',
          params,
          {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(function (res) {
            _this.$store.dispatch('getTodos')
            _this.text = ''
            _this.category_id = ''
        })        
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
