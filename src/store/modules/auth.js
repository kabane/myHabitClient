import axios from 'axios'

let authModule = {
    namespaced: true,
    state: {
      user: null,
    },
    getters: {
      user (state) {
        return state.user
      }
    },
    actions: {
      signUp ({commit}, params) {
        let url = this.state.config.app.APIURL + '/users/sign_up'
  
        return axios.post(url, {
          user: params 
        }, {
          headers: {'Content-Type': 'application/json'}
        })
        .then(function(res) {
          $cookies.set('token', res.data.token);
        })
      },
      login ({commit}, params) {
        var url = this.state.config.app.APIURL + '/users/login'
  
        return axios.post(url, {
          user: params
        }, {
          headers: {'Content-Type': 'application/json'}
        })
        .then(function(res) {
          $cookies.set('token', res.data.token);
        })
      },
      logout ({commit}) {
        var url = this.state.config.app.APIURL + '/users/logout'
  
        return axios.get(url, {
          withCredentials: true
        })
        .then(function(status, res) {
          if ($cookies.isKey('token')) {
            $cookies.remove('token')
          }
        })
      },
      fetch () {
  
      }
    }
  }

  export default authModule