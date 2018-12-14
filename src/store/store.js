import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { appConfig } from '../config/app.env'

Vue.use(Vuex);
 
const todoModule = {
  namespaced: true,
  state: {
    progressTodo: null,
    todos: [],
    config: {
      status: {
        'READY': 0,
        'DOING': 1,
        'DONE': 2
      }          
    }
  },
  getters: {
    status (state) {
      return state.config.status
    },
    doingTodos (state, getters) {
      var i = 0,
      results = [],
      todo,
      todos = state.todos

      for (i; i < todos.length; i++) {
        todo = todos[i]
        if (todo.status !== state.config.status["DOING"]) {
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
        if (todo.status === state.config.status["DONE"]) {
          results.push(todo)
        }
      }

      return results
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
  },
  actions: {
    getTodos ({commit}) {
      return axios.get(this.state.config.app.APIURL)
      .then(function (res) {
        var todos = res.data
        commit('setTodos', todos)
      })
    }
  }
}


export default new Vuex.Store({
  modules: {
    todo: todoModule
  },
  state: {
    categories: [],
    config: {
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
    setCategories (state, payload) {
      var categories = payload
      state.categories = categories
    }
  },
  actions: {
    getCategories ({commit}) {
      return axios.get(this.state.config.app.APIURL+'categories/')
      .then(function (res) {
        var categories = res.data
        commit('setCategories', categories)
      })
    }
  }

});