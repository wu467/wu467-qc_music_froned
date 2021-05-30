import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {  //状态管理
      picUrl: 'https://avatars.githubusercontent.com/u/58961430?v=4',   //初始专辑图片
      songName: '',   //歌曲名称
      musicUrl: 'http://isure.stream.qqmusic.qq.com/C400001jtUoX1b2FgO.m4a?guid=2796982635&vkey=E9399115303F4BADB317C934F626E167C3EB395F06C86FB88305FFF058E2856C2089AE116E5ECFB77E5A41E8943124D86BFF7D577631CBFF&uin=&fromtag=99',  //播放链接地址
      songMid: '',
      
    },
    mutations: {  //修改state
      changeDataAlbumMid(state,params){  
        state.picUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+params+'.jpg'
      },
      changeDataName(state,songName){
        state.songName = songName
      },      
      changeDataUrl(state,musicUrl){
        state.musicUrl = musicUrl
      },
      changeDataMid(state, songMid){
        state.songMid = songMid
      }      
    },
    getters:{   //类似于computed，返回从store中获取一些state处理后的数据

    },
    actions: {  //异步操作

    },
    modules: {  //模块

    },
    
})
