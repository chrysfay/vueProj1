import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/user/Users.vue'

// 分类
import Params from './components/goods/Params.vue'

import Cate from './components/goods/Cate.vue'

import GoodsList from './components/goods/List.vue'

import Add from './components/goods/Add.vue'

Vue.use(Router)

const router = new Router({

  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome }, 
        { path: '/users', component: Users },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList }
      ] }
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from 从哪个路径跳转而来
  // next是一个函数,表示放行
  //    next() 放行, next('/login) 强制跳转
  
  if(to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
