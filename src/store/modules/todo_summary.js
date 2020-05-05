import axios from 'axios'

let todoSummaryModule = {
    namespaced: true,
    state: {
      labels: [],
      datum: []
    },
    getters: {
      labels (state) {
        return state.labels
      },
      datum (state) {
        return state.datum
      }
    },
    mutations: {
      setLabels (state,  payload) {
        debugger;
        state.labels = payload
      },
      setDatum (state,  payload) {
        state.datum = payload
      }
    },
    actions: {
      fetch ({commit}) {
        var url = this.state.config.app.APIURL + '/todos/summary'
  
        return axios.get(url, {
          withCredentials: true
        })
        .then(function(res) {
          debugger;
          commit('setLabels', res.data.labels)
          commit('setDatum', res.data.datum)
        })
      }
    }
  }

  export default todoSummaryModule