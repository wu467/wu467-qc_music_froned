<template>
  <div>
    <!-- 切换组件是使用elementUI的内置过渡动画 -->
    <transition name="el-zoom-in-center">
      <el-row  v-if="!songlist_visible">
        <el-col :span="6" v-for="(item, index) of list" :key="index">
          <el-card :body-style="{ padding: '0px' }" class="card" >
            <img v-bind:src="item.cover" class="image" @click="showSongList(item.content_id)">  
            <div class="playListTitle">
                <span  class="basic-r" style='width:120px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;'> {{item.title}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 子组件（歌曲列表）的显示与隐藏 -->
      <base-list-songs v-bind:parentComponentData="toSonData" v-if="songlist_visible" @closeBaseListSongs="showPlayList" />
    </transition>
  </div>
</template>

<script>
import {getPlayList} from '@/api/music_api/playList'  //导入获取歌单列表
import BaseListSongs from '@/components/PageBody/BaseListSongs'

export default ({
    data() {
      return {
        list: [],  //歌单列表数据
        songlist_visible: false,  // 控制子组件显示与隐藏的标识，类型为Boolean
        toSonData: {  // 传递给子组件的数据（对象形式）
          mark: 'share',
          unsureContent: ''
        }
      }
    },
    components: {
      BaseListSongs
    },
    created(){
        this.fetchPlayList()
    },
    methods: {
      async fetchPlayList(){
        getPlayList().then((response) =>{
            const value = response.data  // http响应对象的data属性（json格式）
            this.list = value.data.list 
        })
      },
      showSongList(content_id){
        this.songlist_visible = !this.songlist_visible    //隐藏显示父/子组件
        this.toSonData.unsureContent = content_id    //点击后将歌单的唯一id传递给子组件对象的unsureContent
      },
      showPlayList(){
        this.songlist_visible = !this.songlist_visible    //隐藏显示父/子组件
      }
    },
})
</script>

<style>

  .card {
    margin-right: 25px;
    margin-top: 20px;
  }
  .playListTitle {
    font-size: 12px; 
    margin-top: 10px;
    margin-bottom: 2px;
    text-align: center;
    color: black;
  }

  /* 鼠标悬浮图片变大过渡 */
  .card img{
    cursor: pointer;
    transition: all 0.6s;
  }

  .card img:hover{
    /* 鼠标悬浮图片变大 */
    transform: scale(1.1);
    /* 鼠标悬浮图片变灰和透明 */
    filter:alpha(Opacity=80);
    -moz-opacity:0.8;
    opacity: 0.8;
  }
</style>
