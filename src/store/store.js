import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  state: {
    progressTodo: null,
    todos: [],
    config: {
      todo: {
        status: {
          'READY': 0,
          'DOING': 1,
          'DONE': 2          
        }
      }
    }
  },
  getters: {
    progressTodo (state) {
      return state.progress_todo
    },
    statusReady (state) {
      return state.config.todo.status['READY']
    },
    statusDoing (state) {
      return state.config.todo.status['DOING']
    },
    statusDone (state) {
      return state.config.todo.status['DONE']
    },
    getDoingTodo (state, getters) {
      var i = 0,
      results = [],
      todo,
      todos = state.todos

      for (i; i < todos.length; i++) {
        todo = todos[i]
        if (todo.status !== getters.statusDone) {
          results.push(todo)
        }
      }

      return results
    },
    getDoneTodo (state, getters) {
      var i = 0,
          results = [],
          todo,
          todos = state.todos

      for (i; i < todos.length; i++) {
        todo = todos[i]
        if (todo.status === getters.statusDone) {
          results.push(todo)
        }
      }

      return results
    },
  },
  mutations: {
    updateCurrentTodo (state, payload) {
      state.progressTodo = payload 
    },
    destroyCurrentTodo (state) {
      state.progressTodo = null
    },
    setTodos (state, payload) {
      var todos = payload
      for(var i = 0; i < todos.length; i++) {
        state.todos.push(todos[i])
      }
    },
    setTodo (state, payload) {
      var todo = payload
      state.todos.push(todo)
    }
  },
  actions: {
    getTodos ({commit}) {
      axios.get('http://localhost:3000/')
      .then(function (res) {
        var todos = res.data
        commit('setTodos', todos)
      })
    }
  }

});