<!-- 推荐歌单里的歌曲 -->
<template>
  <div>
    <!-- 不同：组件初始化无值，加载时组件的值就会出现undefine，所以初始化组件时要先给一个值（这里用过滤器赋给tableData为空的值）
         当加载组件完成后该组件会调用api接口，接口返回的值重新赋值给tabletData
     -->
    <el-table :data="(tableData || '').slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" >
      <el-table-column prop="songname" label="歌曲" width="240"> </el-table-column>
      <el-table-column prop="singer[0].name" label="歌手" width="180"> </el-table-column>
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
import {getPlayListSongs} from '@/api/music_api/playListSongs'
 
  export default ({
    data() {
      return {
        tableData: [],  
        pageSize: 9,  
        currentPage:1, 
      }
    },
    created(){
      this.fetchNewSongs()
    },
    methods: {
      async fetchNewSongs(){

        let content_id = this.$route.params.content_id

        getPlayListSongs(content_id).then((response) =>{
            const value = response.data  
            this.tableData = value.data.songlist 
        })
      }, 
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      playSong : function(index){
        //不同：NewSongs中api返回的数据中键名为mid的值是歌曲的唯一id，而歌单列表中则是键名songmid
        const songmid = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)[index].songmid  
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