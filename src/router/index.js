import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(Router)

const routes = new Router({
  routes: [
    {
      path: '/',
      name: 'todo-app',
      component: require('@/components/TodoApp').default,
    },
    {
      path: '/todos',
      name: 'todo-app',
      component: require('@/components/TodoApp').default,
    },
    {
      path: '/categories',
      name: 'category',
      component: require('@/components/Category').default
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: require('@/components/DashboardBase').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/Login').default,
      meta: { isPublic: true }
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: require('@/components/SignUp').default,
      meta: { isPublic: true }
    }
  ]
})


routes.beforeEach((to, from, next) => {
  if(to.meta.isPublic) return next()
  // isPublic でない場合(=認証が必要な場合)、かつ、ログインしていない場合
  if (!$cookies.isKey('token')) {
    return next({ path: '/login'});
  } else if (from.path==="login" || from.path==="sign_up") {
    return next({ path: '/'});
  } else {
    return next();
  }
});

export default routes
