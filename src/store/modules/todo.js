import axios from 'axios'

let todoModule = {
    namespaced: true,
    state: {
      progressTodo: {
        todo: null,
        interval_id: null
      },
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
        state.todos.push(payload)
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

  export default todoModule