import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index'
import Login from '../components/Login'
import Register from '../components/Register'
import Claim from '../components/Claim'
import Claims from '../components/Claims'



Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/claim',
    name: 'Claim',
    component: Claim
  },
  {
    path: '/claims',
    name: 'Claims',
    component: Claims
  }
]

const router = new VueRouter({
  routes
})

export default router
