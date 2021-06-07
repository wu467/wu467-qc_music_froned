<template>
  <div>
    <!-- 不同：组件初始化无值，加载时组件的值就会出现undefine，所以初始化组件时要先给一个值（这里用过滤器赋给tableData为空的值）
        当加载组件完成后该组件会调用api接口，接口返回的值重新赋值给tabletData
    -->
    <el-table :data="(tableData || '').slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" >
      <el-table-column prop="songname" label="歌曲" width="240"> </el-table-column>
      <el-table-column prop="singer[0].name" label="歌手" width="180"> </el-table-column>
      <el-table-column prop="time" ></el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="{}">
          <el-button v-if="showButtonToShare" @click="backTrack1()" type="success" round>返回歌单</el-button> 
          <el-button v-if="showButtonToSearch" @click="backTrack2()" type="success" round>返回soso</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="playSong(scope.$index)">🎧 播放</el-button>
          <el-button size="small" type="info" @click="favoriteSong(scope.$index)">🤍 收藏</el-button>
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
import {getPlayMusic} from '@/api/music_api/playMusic'  //播放歌曲
import {getData} from '@/api/music_api/musicApi'
import {getCookie} from '@/utils/auth'  //获取用户cookie
import {getFavoriteSong} from '@/api/backStage_api/favoriteSong' //向后端请求收藏api

  export default ({
    data() {
      return {
        tableData: [],  
        pageSize: 9,  
        currentPage:1,
        showButtonToShare: false,  // 是否显示返回按钮
        showButtonToSearch: false,  
        parentData: this.parentComponentData, //父组件传递给子组件的数据
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
    methods: {
      fetchSongs(){
        getData(this.parentData.mark, this.parentData.unsureContent).then((response) =>{
            if (this.parentData.mark === 'share'){
              this.showButtonToShare = true;  //如果是父组件share或search 调用该子组件，则显示返回按钮
              this.tableData = response.data.data.songlist 
            } 
            else if(this.parentData.mark === 'search') {
              this.showButtonToSearch = true; 
              this.tableData = response.data.data.song.list                           
            }
            else if (this.parentData.mark === 'new'){
              const data = response.data.data.list
              // js修改key名 替换数组中歌曲的键名，和歌曲的唯一id，便于管理。
              let newData = [];  //创建一个新数组接收
              let obj = {};  //创建一个临时对象
              data.map(item => {
                obj = item;
                obj['songname'] = item['name'];  //替换键名
                obj['songmid'] = item['mid']
                obj['albummid'] = item.album.mid
                newData.push(obj);     //将替换后的键值对放入新的数组中
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
      playSong : function(index){
        const currentSong = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)[index]  //当前点击歌曲
        const songmid = currentSong.songmid //选中歌曲的songmid
        const albummid = currentSong.albummid //选中歌曲的albummid
        const songName = currentSong.songname   //选中歌曲的名称


        this.$store.commit('changeDataMid',songmid)   //将获取到的歌曲相关信息交给vuex管理
        this.$store.commit('changeDataName',songName)
        this.$store.commit('changeDataAlbumMid',albummid) 

        getPlayMusic(songmid).then(response=>{ 
          const url = response.data.data[songmid]
          console.log("在BashListSongs里")
          console.log(url)
          this.$store.commit('changeDataUrl',url)  //将获取到的歌曲播放链接交给vuex管理
        })                                                                                               
      },
      favoriteSong : function(index){
        // 点击收藏按钮后，获取浏览器中的用户cookie信息，如果有则收藏，没有则提示用户登录
        const cookie = getCookie("username");
        if (cookie == null){
          this.$notify({
            title: '没有登录',
            message: '   登录后再收藏吧~',
            type: 'warning',
            showClose: false,
          }); 
        } else {
          const uid = getCookie("userId")  //从cookie中获取uesId
          var userId = parseInt(uid);   //将字符串类型的userId转换为数值型，与后台接受的类型保持一致。
          //获取当前点击歌曲的songmid
          const songmid = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)[index].songmid  
          //当用户进行收藏或取消收藏歌曲时改变songCount的值，收藏则加一，取消收藏则减一
          // 调用收藏歌曲api，将userId和songmid传递给后台
          getFavoriteSong(userId, songmid).then( res => {

            // 测试，用户是收藏还是取消收藏
            console.log(res.msg)

            if(res.msg === '收藏成功！'){  //收藏
              this.$notify({
                title: res.msg,
                type: 'success',
                showClose: false,
              });
              //用户收藏时vuex中songCount加一
              this.$store.commit('incrementSongCount')               
            } else if(res.msg === '取消收藏成功！') {  //取消收藏
                this.$notify({
                  title: res.msg,
                  type: 'success',
                  showClose: false,
                });
                //vuex中的songCount减一
                this.$store.commit('decrementSongCount')
              }
          });
        }
      },
      backTrack1 : function(){
        this.$emit("closeBaseListSongs")
      },
      backTrack2 : function(){
        this.$emit("closeBaseListSongs")
      },
    },
    
  })

</script>

<style scoped>
</style>