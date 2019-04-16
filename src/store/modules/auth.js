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
          $cookies.set('token', res.data.token);
        })
      },
      login ({commit}, paramsObj) {
        var url = this.state.config.app.APIURL + '/users/login'
  
        return axios.post(url, {
          user: {
            email: paramsObj.email,
            password: paramsObj.password
          }      
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