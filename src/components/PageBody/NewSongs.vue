<template>
  <div>
    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" >
      <el-table-column prop="name" label="歌曲" width="240"> </el-table-column>
      <el-table-column prop="singer[0].name" label="歌手" width="180"> </el-table-column>
      <el-table-column prop="time" label="时长"></el-table-column>

      <!-- 播放和收藏 -->
      <el-table-column>
        <template slot-scope="scope">
        <el-button icon="el-icon-headset" size="mini" type="success" @click="playSong(scope.$index)">播放{{scope.$index}}</el-button>
          <el-button icon="el-icon-star-off" size="mini" type="info" @click="favoriteSong(scope.$index, scope.row)">收藏</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页导航条 -->
    <el-pagination align='center' 
      @current-change="handleCurrentChange" 
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="tableData.length">
    </el-pagination>
  </div>
</template>

 <script>
import {getPlayMusic} from '@/api/music_api/playMusic'
import {getNewSongs} from '@/api/music_api/newSongs'

  export default ({
    data() {
      return {
        tableData: [],  //后端返回的json数据中
        pageSize: 9,  //每页的数据条数
        currentPage:1, //默认显示第几页
      }
    },
    created(){
      this.fetchNewSongs()
    },
    methods: {
      async fetchNewSongs(){
        getNewSongs().then((response) =>{
            const value = response.data  // http响应对象的data属性（json格式）
            this.tableData = value.data.list 
            console.log(response); // http响应对象          
        })
      }, 
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      playSong : function(index){
        const songmid = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)[index].mid  //获取点击歌曲的 songmid
        this.fetchPlaySong(songmid)
      },
      async fetchPlaySong(songmid){
        getPlayMusic(songmid).then(response=>{
          console.log(response.data.data[songmid])  // 返回的数据（js对象），通过键songmid获取对应的值
          const url = response.data.data[songmid]
          window.open(url,'_blank')   //跳转到播放地址页面
        })
      } 
    }
  })

</script>