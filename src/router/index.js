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
    path: '/Register',
    name: 'Register',
    component: ()=>import('@/components/PersonalCenter/register/Register.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: ()=>import('@/components/PersonalCenter/login/Login.vue')
  },
  {
    path: '/user/resPassword',
    name: 'RestPassword',
    component: ()=>import('@/components/PersonalCenter/RestPassword.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
