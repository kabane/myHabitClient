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


function isAuthorized() {
  if (!document.cookie) return false 
  var cookiesObj = {};
  var cookies_str = document.cookie.split('; ');
  for(var i=0;i<cookies_str.length;i++){
    var data = cookies_str[i].split('=');
    if (data[0] === 'token') {
      cookiesObj['token'] = decodeURIComponent(data[1])  
    }
  }

  return cookiesObj.hasOwnProperty('token') && typeof (cookiesObj['token']) == "string"
}

routes.beforeEach((to, from, next) => {
  console.log("aa")
  debugger;
  if(to.meta.isPublic) return next()
  // isPublic でない場合(=認証が必要な場合)、かつ、ログインしていない場合
  if (!isAuthorized()) {
    return next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    return next();
  }
});

export default routes
