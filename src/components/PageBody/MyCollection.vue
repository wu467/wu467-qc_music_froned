<!-- 我的收藏组件 -->
<template>
    <div>
        {{cookieContext}}
    </div>
</template>

<script>
import {getCookie} from '@/utils/auth'
import {getAllFavorite} from '@/api/backStage_api/allFavorite'  //用户所有收藏歌曲
import {getSongBatch} from '@/api/music_api/songBatch.js' //从qq音乐中获取收藏歌曲的信息
import BaseListSongs from '@/components/PageBody/BaseListSongs'

export default {
  name: 'MyCollection',
  data() {
    return {
      toSonData: {
        mark: 'collection',    // 传递给子组件的数据
      }
    }
  },
  components: {
    BaseListSongs,
  },
  created(){
    // 该组件创建时判断是否存在用户cookie，如果没有则提示用户去登录
    const cookie = getCookie('username')
    this.cookieContext = cookie

    if(cookie == null) {
      this.gotoLogin(); //去登陆
    } else {
      this.fetchCollection();  //获取用户收藏歌曲
    }
  },
  methods:{
    gotoLogin(){
      this.cookieContext = "没有登陆，登录后可收藏歌曲哦>>>"
    },
    fetchCollection : function(){    // 根据用户名称获取收藏歌曲
      const uid = getCookie('userId')
      var userId = parseInt(uid)
      //获取用户所有收藏歌曲
      getAllFavorite(userId).then((res) => {
        getSongBatch(res.data).then((response) => {
          console.log("用户收藏歌曲的基本信息")
          var songMessage = response.data.data         //  获取到了收藏歌曲的基本信息
          console.log(songMessage)

          // 根据songMessage对象的键的个数创建一个数组
          var songList = new Array()

          // 替换songMessage对象键名，并将键值对存入到songList数组中
          var i =0;
          for (let key in songMessage) {
              songMessage["song"] = songMessage[key]
              songList.push(songMessage["song"])
              delete songMessage[key]
          }
          console.log("标记")
          console.log(songList)

          //判断songList数组是否有值，无则提示用户无收藏歌曲，有则将该数组传递给子组件
          if(songList.length == 0){
            // 提示无收藏歌曲
          } else {
            //将数组传递给子组件
            // 1.引入子组件BaseListSongs
            // 2.修改子组件BaseListSongs。

          }
        })
      })
    }
  }
}
</script>
