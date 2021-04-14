import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/ListSongs/:content_id',
    name: 'ListSongs',
    component: () => import('@/components/PageBody/BaseListSongs.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
