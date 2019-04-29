import axios from 'axios'

let todoModule = {
    namespaced: true,
    state: {
      todos: [],
      config: {
        status: {
          'READY': 'ready',
          'DOING': 'doing',
          'DONE': 'done'
        }          
      }
    },
    getters: {
      status (state) {
        return state.config.status
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
          if (todo && todos[i].id === todo.id) {
            todos.splice(i, 1, todo)
          }
        }
        
        return todo
      },
      addTodo (state, payload) {
        state.todos.unshift(payload)
      }
    },
    actions: {
      getAll ({commit}) {
        let token = $cookies.get('token');
        return axios.get(this.state.config.app.APIURL + "/todos")
        .then(function (res) {
          commit('setTodos', res.data)
        })
      },
      create ({commit}, paramsObj) {
        let url = this.state.config.app.APIURL + '/todos'
  
        return axios.post(url, {todo: paramsObj}, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(function(res) {
          var todo = res.data
          commit('addTodo', todo)
        })
  
      },
      update ({commit}, params) {
          var _this = this,
               url = this.state.config.app.APIURL + '/todos/' + params.id
  
        return axios.patch(url, {todo: params})
        .then(function (res) {
          var todo = res.data
          commit('setTodo', todo)
          return todo
        })
      }
    }
  }

  export default todoModule