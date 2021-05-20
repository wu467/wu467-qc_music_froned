import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {  //状态管理
      picUrl: ''
    },
    mutations: {  //修改state
      changeDataAlbumMid(state,params){  
        state.picUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+params+'.jpg'
      }
    },
    actions: {  //异步操作

    },
    modules: {  //模块

    },
    
})
