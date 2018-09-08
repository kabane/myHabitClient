import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  state: {
      progress_todo: null
  },
  getters: {
    progressTodo (state) {
        return state.progress_todo
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