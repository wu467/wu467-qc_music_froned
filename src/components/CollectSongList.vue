<template>
  <div>
    <!-- 不同：组件初始化无值，加载时组件的值就会出现undefine，所以初始化组件时要先给一个值（这里用过滤器赋给tableData为空的值）
         当加载组件完成后该组件会调用api接口，接口返回的值重新赋值给tabletData
     -->
    <el-table :data="(tableData || '').slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" >
      <el-table-column prop="track_info.name" label="歌曲" width="240"> </el-table-column>
      <el-table-column prop="track_info.singer[0].name" label="歌手" width="180"> </el-table-column>
      <el-table-column prop="time" label="时长"></el-table-column>

      <el-table-column>
        <template slot-scope="scope">
        <el-button icon="el-icon-headset" size="mini" type="success" @click="playSong(scope.$index)">播放{{scope.$index}}</el-button>
          <el-button icon="el-icon-star-off" size="mini" type="info" @click="favoriteSong(scope.$index, scope.row)">收藏</el-button>
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
      alert(this.userId)
      this.fetchCollection(this.userId);  //获取用户收藏歌曲
    },
    methods: {
       fetchCollection : function(userId){    // 根据用户名称获取收藏歌曲
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
                 this.tableData = songList
                 console.log(songList)
              }
            })
          })
    }, 
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      playSong : function(index){
        //不同：NewSongs中api返回的数据中键名为mid的值是歌曲的唯一id，而歌单列表中则是键名songmid
        const songmid = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)[index].track_info.mid  
        this.fetchPlay(songmid)                                                                                               
      },
      async fetchPlay(songmid){
        getPlayMusic(songmid).then(response=>{
          const url = response.data.data[songmid]
          window.open(url,'_blank')   
        })
      } 
    }
  })
</script>