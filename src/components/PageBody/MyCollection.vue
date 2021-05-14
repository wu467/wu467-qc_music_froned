<!-- 我的收藏组件 -->
<template>
    <div>
        我的收藏歌曲。。。>>> {{cookieContext}}

    </div>
</template>

<script>
import {getCookie} from '@/utils/auth'

export default {
  name: 'MyCollection',
  data() {
    return {
        cookieContext:''
    }
  },
  created(){
    // 该组件创建时判断是否存在用户cookie，如果没有则提示用户去登录
    const cookie = getCookie()
    this.cookieContext = cookie

    if(cookie == null) {
      this.gotoLogin(); //去登陆
    } else {
      this.fetchCollection();  //获取用户收藏歌曲
    }
  },
  methods:{
    gotoLogin(){
      this.cookieContext = "没有登陆，登录后可收藏歌曲哦"
    },
    fetchCollection(){    // 根据用户名称获取收藏歌曲

    }
  }
}
</script>
