import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import { appConfig } from '../config/app.env'

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
axios.defaults.withCredentials = true

import authModule from './modules/auth'
import todoModule from './modules/todo'
import categoryModule from './modules/category'
import todoSummaryModule from './modules/todo_summary'

export default new Vuex.Store({
  modules: {
    todo: todoModule,
    category: categoryModule,
    auth: authModule,
    todo_summary: todoSummaryModule
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