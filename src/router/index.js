import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [  
  {
    path: '',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/ListSongs/:searchVal',
    name: 'ListSongs',
    component: () => import('@/components/PageBody/BaseListSongs.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: ()=>import('@/views/register/Register.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: ()=>import('@/views/login/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
