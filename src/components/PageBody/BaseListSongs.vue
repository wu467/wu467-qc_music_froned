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
          <template slot="header" slot-scope="{}">
            <el-button v-if="showButton" @click="backTrack()" type="success" round>返回歌单</el-button>  
          </template>
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
        showButton: false,
        parentData:( this.parentComponentData || 'search') //父组件传递给子组件的对象数据
      }
    },
    props: {
      parentComponentData: {  // 接受父组件传递过来的对象
        type: Object
      }
    },
    created(){ //html加载完成之前，执行。
      this.fetchSongs()
    },
    //html加载完成后，执行。因为其他父组件也调用了该组件，所以一开始该组件就已经初始化了（还未通过Search组件搜索跳转时），
    //此时获取的 this.$route.params.searchVal 为 undefine，必须要等到页面加载完后再获取searchVal
    mounted() { 
      const searchV = (this.$route.params.searchVal || '')  //使用过滤器，当this.$route.params.searchVal有值时就用该值，无值时则赋值为 ''
      // 从请求路径获取完searchVal后，调用api接口，传入请求status和搜索值。将其返回的数据再次渲染到页面显示
       if (searchV != ''){  //当this.$route.params.searchVal获取到值时，则证明使用了Search组件
        getData('search', searchV).then((response) =>{
          this.tableData = response.data.data.song.list
        })
      }
    },
    methods: {
      async fetchSongs(){
        getData(this.parentData.mark, this.parentData.unsureContent).then((response) =>{
            if (this.parentData.mark == 'share'){
              this.showButton = true;  //如果是父组件分享歌单调用该子组件，则显示返回按钮
              this.tableData = response.data.data.songlist 
            } 
            else if (this.parentData.mark == 'new'){
              const data = response.data.data.list
              // js修改key名 替换数组中歌曲的键名，和歌曲的唯一id，便于管理。
              let newData = [];  //创建一个新数组接收
              let obj = {};  //创建一个临时对象
              data.map(item => {
                obj = item;
                obj['songname'] = item['name'];  //替换键名
                obj['songmid'] = item['mid']
                newData.push(obj);     //将替换后的键值对放入新的数组中
                delete obj['keyName'];  //替换后删除，也可以不删除
              })
              this.tableData = newData;
            } 
            else {
              console.log("获取数据错误")
            }
        })
      }, 
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      backTrack : function(){
        this.$emit("closeBaseListSongs")
      },
      playSong : function(index){
        const songmid = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)[index].songmid  
        this.fetchPlay(songmid)                                                                                               
      },
      async fetchPlay(songmid){
        getPlayMusic(songmid).then(response=>{
          const url = response.data.data[songmid]
          window.open(url,'_blank')   
        })
      } 
    },
    
  })

</script>

<style scoped>
</style>