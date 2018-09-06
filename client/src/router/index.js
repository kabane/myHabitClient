import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todo-app',
      component: require('@/components/TodoApp').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
