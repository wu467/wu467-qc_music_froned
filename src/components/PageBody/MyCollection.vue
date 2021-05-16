<!-- 我的收藏组件 -->
<template>
    <div>
      <div v-if="!showList">
        <h1>没有登陆，赶快去登录吧！</h1>
      </div>
      <collect-song-list v-bind:parentComponentData="toSonData" v-if="showList"/>
    </div>
</template>

<script>
import {getCookie} from '@/utils/auth'
import CollectSongList from '@/components/CollectSongList' //收藏歌曲列表

export default {
  name: 'MyCollection',
  data() {
    return {
      showList: "false",   //是否显示歌曲列表,
      toSonData: ""   //传递给子组件的数据（用户ID）
    }
  },
  components: {
    CollectSongList,
  },
  created(){
    // 该组件创建时判断是否存在用户cookie，如果没有则提示用户去登录
    const cookie = getCookie('username')

    if(cookie == null) {
      this.showList = false; //去登陆
    } else {
      //显示歌曲列表组件
      this.showList = true; 
      //将用户id传递给子组件
      const uid = getCookie('userId')
      var userId = parseInt(uid) 
      this.toSonData = userId

      alert("传递的uid："+ userId)
    }
  },
  methods:{
  }
}
</script>
