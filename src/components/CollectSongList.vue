<template>
  <div>
    <!-- 不同：组件初始化无值，加载时组件的值就会出现undefine，所以初始化组件时要先给一个值（这里用过滤器赋给tableData为空的值）
         当加载组件完成后该组件会调用api接口，接口返回的值重新赋值给tabletData
     -->
    <el-table :data="(tableData || '').slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" >
      <el-table-column prop="track_info.name" label="歌曲" width="240"> </el-table-column>
      <el-table-column prop="track_info.singer[0].name" label="歌手" width="180"> </el-table-column>
      <el-table-column prop="time"></el-table-column>

      <el-table-column>
        <template slot-scope="scope">
        <el-button  size="small" type="success" @click="playSong(scope.$index)">🎧 播放</el-button>
          <el-button size="small " type="info" @click="favoriteSong(scope.$index)">❤️‍</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination align='center' 
      @current-change="handleCurrentChange" 
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="(tableData || '').length">
    </el-pagination>

  </div>

</template>

<script>
import {getPlayMusic} from '@/api/music_api/playMusic'
import {getAllFavorite} from '@/api/backStage_api/allFavorite'  //用户所有收藏歌曲的songmid（一个字符串）
import {getSongBatch} from '@/api/music_api/songBatch.js' //从qq音乐中获取收藏歌曲的信息
import {getFavoriteSong} from '@/api/backStage_api/favoriteSong' //向后端请求收藏api
import {getCookie} from '@/utils/auth'  //获取用户cookie

  export default ({
    data() {
      return {
        tableData: [],  
        pageSize: 9,  
        currentPage:1, 
        userId: this.parentComponentData,  //父组件传递过来的用户ID
      }
    },
    props: {
      parentComponentData: {  // 接受父组件传递过来的用户ID
       type: Number
    }
    },
    created(){
      this.fetchCollection(this.userId);  //获取用户收藏歌曲
    },
    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      playSong : function(index){
        const currentSong = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)[index].track_info
        const songmid = currentSong.mid  
        this.fetchPlay(songmid)     

        this.$store.commit('changeDataMid',songmid)   //将获取到的歌曲相关信息交给vuex管理
        this.$store.commit('changeDataAlbumMid',currentSong.album.mid)
        this.$store.commit('changeDataName',this.currentSong.name)
      },
      fetchPlay(songmid){
        getPlayMusic(songmid).then(response=>{
          const url = response.data.data[songmid]
          this.$store.commit('changeDataUrl',url)          
        })
      },
      fetchCollection : function(userId){    // 根据用户名称获取收藏歌曲
        //获取用户所有收藏歌曲
        getAllFavorite(userId).then((res) => {
          getSongBatch(res.data).then((response) => {
            console.log("用户收藏歌曲的基本信息")
            var songMessage = response.data.data         //  获取到了收藏歌曲的基本信息
            this.currentSong = songMessage

            // 根据songMessage对象的键的个数创建一个数组
            var songList = new Array()

            // 替换songMessage对象键名，并将键值对存入到songList数组中
            var i =0;
            for (let key in songMessage) {
                songMessage["song"] = songMessage[key]
                songList.push(songMessage["song"])
                delete songMessage[key]
            }
            //判断songList数组是否有值，无则提示用户无收藏歌曲，有则将该数组传递给子组件
            if(songList.length == 0){
              // 提示无收藏歌曲
            } else {
               this.tableData = songList
                console.log("标记3333")  
                this.$store.commit('changeDataCount', songList.length)           
            }
          })
        })
      }, 
      favoriteSong : function(index){
        const uid = getCookie("userId")  //从cookie中获取uesId
        var userId = parseInt(uid);   //将字符串类型的userId转换为数值型，与后台接受的类型保持一致。
        //获取当前点击歌曲songMid
        const songmid = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)[index].track_info.mid

        //当用户进行收藏或取消收藏歌曲时改变songCount的值，收藏则加一，取消收藏则减一
        // 调用收藏歌曲api，将userId和songmid传递给后台
        getFavoriteSong(userId, songmid).then( res => {
          if(res.msg === '收藏成功！'){  //收藏
            this.$notify({
              title: res.msg,
              type: 'success',
              showClose: false,
            });
            //用户收藏时vuex中songCount加一
            this.$store.commit('incrementSongCount')               
          } 
          else if(res.msg === '取消收藏成功！') {  //取消收藏
              this.$notify({
                title: res.msg,
                type: 'success',
                showClose: false,
              });
              //vuex中的songCount减一
              this.$store.commit('decrementSongCount')
          }
        });
      },
    }
  })
</script>