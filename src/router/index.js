import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: resolve => require(['@/components/Index'],resolve)

  },
  {
    path: '/login',
    name: 'Login',
    component: resolve => require(['@/components/Login'],resolve)
  },
  {
    path: '/register',
    name: 'Register',
    component: resolve => require(['@/components/Register'],resolve)
  },
  {
    path: '/claim',
    name: 'Claim',
    component: resolve => require(['@/components/Claim'],resolve)
  },
  {
    path: '/claims',
    name: 'Claims',
    component: resolve => require(['@/components/Claims'],resolve)
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: resolve => require(['@/components/Leaderboards'],resolve)
  },
  {
    path: '/recovery',
    name: 'Recovery',
    component: resolve => require(['@/components/Recovery'],resolve)
  },
  {
    path: '/newPassword',
    name: 'NewPassword',
    component: resolve => require(['@/components/NewPassword'],resolve)
  }
]

const router = new VueRouter({
  routes
})

export default router
