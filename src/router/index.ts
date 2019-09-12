import Vue from 'vue'
import Router from 'vue-router'

// 404
const Error404 = () => import('../components/Error404.vue')
// 注册
const Register = () => import('../views/Register.vue')
// 登录
const Login = () => import('../views/Login.vue')
// 管理
const AdminIndex = () => import('../views/admin/Index.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/admin',
      component: AdminIndex
    },
    {
      path: '/',
      redirect: '/admin'
    },
    {
      path: '*',
      component: Error404
    }
  ]
})
