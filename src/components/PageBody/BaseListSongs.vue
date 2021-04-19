<!-- 推荐歌单里的歌曲 -->
<template>
  <div>
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
          <el-button icon="el-icon-headset" size="mini" type="success" @click="playSong(scope.$index)">播放</el-button>
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
  </div>

</template>

<script>
import {getPlayMusic} from '@/api/music_api/playMusic'
import {getData} from '@/api/music_api/musicApi'
 

  export default ({
    data() {
      return {
        tableData: [],  
        pageSize: 9,  
        currentPage:1,
        rets: '',
        content: '',
        keyWord: ''
      }
    },
    created(){
      this.fetchSongs()
    },
    methods: {
      async fetchSongs(){

        this.content = this.$route.params.content  //不同，获取playListShare组件调用该组件时传过来的参数 content_id
        this.keyWord = this.$route.params.keyWord  
        if(this.$route.params.rets != null){
          this.rets =  this.$route.params.rets
        } else {
          this.rets = 'new'
        }

        console.log(this.keyWord)

        getData(this.rets,this.content,this.keyWord).then((response) =>{
            //根据rest的取值，调用不同的赋值方法
            if(this.rets == 'share'){
              this.tableData = response.data.data.songlist 
            } else if (this.rets == 'search'){
              this.tableData = response.data.data.song.list
            } else {
              const data = response.data.data.list
              // js修改key名 替换数组中歌曲的键名键名
              let newData = [];  //创建一个新数组接收
              let obj = {};  //创建一个临时对象
              data.map(item => {
                obj = item;
                obj['songname'] = item['name'];  //替换键名
                obj['songmid'] = item['mid']
                delete obj['keyName'];  //替换后删除，也可以不删除
                newData.push(obj);     //将替换后的对象重新放入新的数组中
              })
              this.tableData = newData;
            }
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

<style scoped>
</style>