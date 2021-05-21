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
            <el-button icon="el-icon-star-off" size="mini" type="info" @click="favoriteSong(scope.$index)">收藏</el-button>
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
        showButton: false,  // 是否显示返回按钮
        parentData:( this.parentComponentData || 'search'), //父组件传递给子组件的对象数据
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
    //此时获取的 this.$route.params.searchVal(搜索值) 为 undefine，必须要等到页面加载完后再获取searchVal
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
              this.showButton = true;  //如果是父组件分享歌单 调用该子组件，则显示返回按钮
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
                obj['albummid'] = item.album.mid
                newData.push(obj);     //将替换后的键值对放入新的数组中
              })
              this.tableData = newData;
              console.log(newData[0])
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
        const currentSong = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)[index]  //当前点击歌曲
        const songmid = currentSong.songmid //选中歌曲的songmid

        const albummid = currentSong.albummid //选中歌曲的albummid
        const songName = currentSong.name   //选中歌曲的名称
        this.$store.commit('changeDataName',songName)
        this.$store.commit('changeDataAlbumMid',albummid) //将获取到的歌曲ablummid交给vuex管理

        getPlayMusic(songmid).then(response=>{ 
          const url = response.data.data[songmid]
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
          // 调用收藏歌曲api，将userId和songmid传递给后台
          getFavoriteSong(userId, songmid).then( res => {
            console.log("收藏成功")
            console.log(res.code)
            if(res.code == 200){
              this.$notify({
                title: res.msg,
                type: 'success',
                showClose: false,
              });               
            } else if(res.code == 201) {
                this.$notify({
                  title: res.msg,
                  type: 'success',
                  showClose: false,
                });
              }
          });
        }
      },
    },
    
  })

</script>

<style scoped>
</style>