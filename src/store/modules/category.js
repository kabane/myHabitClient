import axios from 'axios'

let categoryModule = {
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
          if (category.id === id) return category;
        }
      }
    },
    mutations: {
      setCategories (state, payload) {
        var categories = payload.categories
        if (Array.isArray(categories)) {
          state.categories = categories
        } else {
          // 例外
        }
      },
      addCategory (state, payload) { 
        state.categories.push(payload)
      }
    },
    actions: {
      getAll ({commit}) {
        return axios.get(this.state.config.app.APIURL+'/categories/')
        .then(function (res) {
          var categories = res.data
          commit('setCategories', categories)
        })
      },
      create ({commit}, paramsObj) {
        var url = this.state.config.app.APIURL + '/categories'
  
        return axios.post(url, {category: {name: paramsObj.name}}, { 
          headers: {'Content-Type': 'application/json'}
        })
        .then(function(res) {
          var category = res.data
          console.log('created' + category.name)
          commit('addCategory', category)
        })
      }
    }
  }

  export default categoryModule