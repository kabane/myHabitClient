import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = new Router({
  routes: [
    {
      path: '/',
      name: 'todo-app',
      component: require('@/components/TodoApp').default,
    },
    {
      path: '/categories',
      name: 'category',
      component: require('@/components/Category').default
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
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})


function authorization() {
  if (document.cookie == '') return false 
  var cookiesObj = {};
  var cookies_str = document.cookie.split('; ');
  for(var i=0;i<cookies_str.length;i++){
    var data = cookies_str[i].split('=');
    cookiesObj[data[0]] = decodeURIComponent(data[1])
  }

  return cookiesObj.hasOwnProperty('token') && typeof (cookiesObj['token']) == "string"
}

routes.beforeEach((to, from, next) => {
  // isPublic でない場合(=認証が必要な場合)、かつ、ログインしていない場合
  if (to.matched.some(record => !record.meta.isPublic) && !authorization()) {
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});

export default routes
