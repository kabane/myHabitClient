import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  state: {
    progress_todo: null,
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
    }

  },
  mutations: {
    updateCurrentTodo (state, payload) {
      state.progress_todo = payload 
    },
    destroyCurrentTodo (state) {
      state.progress_todo = null
    }
  }
});