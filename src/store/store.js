import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { appConfig } from '../config/app.env'

Vue.use(Vuex);
 
export default new Vuex.Store({
  state: {
    progressTodo: null,
    todos: [],
    categories: [],
    config: {
      todo: {
        status: {
          'READY': 0,
          'DOING': 1,
          'DONE': 2          
        }
      },
      app: appConfig
    }
  },
  getters: {
    appConfig (state) {
      return state.config.app
    },
    progressTodo (state) {
      return state.progressTodo
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
    doingTodos (state, getters) {
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
    doneTodos (state, getters) {
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
    categories (state) {
      return state.categories
    },
    categoryById: (state) => (id) => {
      var categories = state.categories,
        category,
        i = 0

      for (i; i < categories.length; i++) {
        category = categories[i]
        if (category._id === id) return category;
      }
    }
  },
  mutations: {
    updateProgressTodo (state, payload) {
      state.progressTodo = payload 
    },
    destroyProgressTodo (state) {
      state.progressTodo = null
    },
    setTodos (state, payload) {
      var todos = payload
      state.todos = todos
    },
    setCategories (state, payload) {
      var categories = payload
      state.categories = categories
    }
  },
  actions: {
    getTodos ({commit}) {
      return axios.get(this.state.config.app.APIURL)
      .then(function (res) {
        var todos = res.data
        commit('setTodos', todos)
      })
    },
    getCategories ({commit}) {
      return axios.get(this.state.config.app.APIURL+'categories/')
      .then(function (res) {
        var categories = res.data
        commit('setCategories', categories)
      })
    }
  }

});