import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import { appConfig } from '../config/app.env'
import { router } from '../router/index'

Vue.use(Vuex);
Vue.use(VueCookies)
VueCookies.config('7d')

axios.interceptors.request.use(
  (config) => {
    if ($cookies.isKey('token')) {
      config.headers['Authorization'] = `Bearer ${ $cookies.get('token') }`;
    }

    return config;
  }, 

  (error) => {
    return Promise.reject(error);
  }
);

const todoModule = {
  namespaced: true,
  state: {
    progressTodo: {
      todo: null,
      interval_id: null
    },
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
    progressTodo (state) {
      return state.progressTodo
    },
    doingTodos (state, getters) {
      return state.todos.filter(function (todo) {
        return todo.status === state.config.status["DOING"] || todo.status === state.config.status["READY"]
      })
    },
    doneTodos (state, getters) {
      return state.todos.filter(function(todo){
        return todo.status === state.config.status["DONE"]
      })
    }
  },
  mutations: {
    setProgressTodo (state, payload) {
      state.progressTodo = payload
    },
    setTodos (state, payload) {
      var todos = payload.todos
      state.todos = todos
    },
    setTodo (state, payload) {
      var todo = payload,
          todos = state.todos,
          i = 0,
          num = todos.length

      for(i; i < num; i++) {
        if (todos[i]._id === todo._id) {
          todos.splice(i, 1, todo)
        }
      }
      
      return todo
    },
    addTodo (state, payload) {
      console.log('pushed new todo')
      state.todos.push(payload)
    }
  },
  actions: {
    getAll ({commit}) {
      let token = VueCookies.get('token');
      return axios.get(this.state.config.app.APIURL + "/todos", {
        withCredentials: true
      })
      .then(function (res) {
        console.log(res.data)
        commit('setTodos', res.data)
      })
    },
    create ({commit}, paramsObj) {
      var params = new URLSearchParams(paramsObj),
      _this = this,
      url = this.state.config.app.APIURL + 'todos'

      return axios.post(url, params, {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function(res) {
        var todo = res.data.todo
        console.log('created' + todo.name)
        commit('addTodo', todo)
      })
    },
    update ({commit}, paramsObj) {
      var params = new URLSearchParams(paramsObj),
          _this = this,
          url = this.state.config.app.APIURL + 'todos/' + paramsObj._id

      return axios.post(url, params)
      .then(function (res) {
        var todo = res.data.todo
        commit('setTodo', todo)
        return todo
      })
      .then(function (todo) {
        var progressTodo = _this.getters['todo/progressTodo']
        if (progressTodo.todo && progressTodo.todo._id === todo._id) {
          clearInterval(progressTodo.interval_id)
          commit('initProgressTodo')
        }
        return todo
      })
    }
  }
}

const categoryModule = {
  namespaced: true,
  state: {
    categories: [],
  },
  getters: {
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
    },
    addCategory (state, payload) {
      console.log('pushed new category')
      state.categories.push(payload)
    }
  },
  actions: {
    getAll ({commit}) {
      return axios.get(this.state.config.app.APIURL+'/categories/', {
        withCredentials: true
      })
      .then(function (res) {
        var categories = res.data
        commit('setCategories', categories)
      })
    },
    create ({commit}, paramsObj) {
      var params = new URLSearchParams(paramsObj),
          url = this.state.config.app.APIURL + 'categories'

      return axios.post(url, params, { 
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function(res) {
        var category = res.data.category
        console.log('created' + category.name)
        commit('addCategory', category)
      })
    }
  }
}

const AuthModule = {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    
  },
  actions: {
    signUp ({commit}, paramsObj) {
      var url = this.state.config.app.APIURL + '/users/sign_up',
          params = new URLSearchParams();
          params.append('email', paramsObj.email)
          params.append('password', paramsObj.password)

      return axios.post(url, {
        user: {
          email: paramsObj.email,
          password: paramsObj.password
        }
      }, {
        srfHeaderName: 'X-CSRF-Token',
        withCredentials: true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function(res) {
        VueCookies.set('token', res.data.token);
      })
    },
    login ({commit}, paramsObj) {
      var url = this.state.config.app.APIURL + '/users/login',
          params = new URLSearchParams();
          params.append('email', paramsObj.email)
          params.append('password', paramsObj.password)

      return axios.post(url, {
        user: {
          email: paramsObj.email,
          password: paramsObj.password
        }      
      }, {
        headers: {'Content-Type': 'application/json'}
      })
      .then(function(res) {
        VueCookies.set('token', res.data.token);
      })
    },
    logout ({commit}) {
      var url = this.state.config.app.APIURL + '/users/logout'

      return axios.get(url, {
        withCredentials: true
      })
      .then(function(status, res) {
        debugger;
        if ($cookies.isKey('token')) {
          $cookies.remove('token')
        }
      })
    },
    fetch () {

    }
  }
}

export default new Vuex.Store({
  modules: {
    todo: todoModule,
    category: categoryModule,
    auth: AuthModule
  },
  state: {
    config: {
      app: appConfig
    }
  },
  getters: {
    appConfig (state) {
      return state.config.app
    }
  }
});