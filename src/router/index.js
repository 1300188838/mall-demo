import VueRouter from 'vue-router'
import Vue from 'vue'
//安装插件
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/home/Home')
  },
  {
    path: '/category',
    component: () => import('../views/category/Category')
  },
  {
    path: '/car',
    component: () => import('../views/car/Car')
  },
  {
    path: '/profile',
    component: () => import('../views/profile/Profile')
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router

