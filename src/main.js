import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Buefy
import Buefy from 'buefy';
import 'buefy/dist/buefy.css'
//element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// vuex
import Vuex from 'vuex'

Vue.use(Buefy)
Vue.use(ElementUI);
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
