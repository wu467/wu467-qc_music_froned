<template>
<div>
  <el-row>
    <el-col :span="6" v-for="(item, index) of list" :key="index">
      <el-card :body-style="{ padding: '0px' }" class="card" >
        <!-- 点击歌单图片跳转到子组件 -->
        <router-link :to="'/ListSongs/'+ item.content_id +'/'+rets " target='_blank'>
          <img v-bind:src="item.cover" class="image">  
          <div class="playListTitle">
              <span style="">{{item.title}}</span>
          </div>
        </router-link>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
 import {getPlayList} from '@/api/music_api/playList'  //导入获取歌单列表

export default ({
    data() {
      return {
        list: [],
        rets: this.ret
      }
    },
    props: {
      ret:{
        type: String,
      }
    },
    created(){
        this.fetchPlayList()
    },
    methods: {
      async fetchPlayList(){
        getPlayList(this.rets).then((response) =>{
            const value = response.data  // http响应对象的data属性（json格式）
            this.list = value.data.list 
        })
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
    margin-block-end: 5px;
    text-align: center;
    color: black;
  }

  /* 鼠标悬浮图片变大过渡 */
  img{
    cursor: pointer;
    transition: all 0.6s;
    /* border-radius: 25px; */
  }

  img:hover{
    /* 鼠标悬浮图片变大 */
    transform: scale(1.1);
    /* 鼠标悬浮图片变灰和透明 */
    filter:alpha(Opacity=80);
    -moz-opacity:0.8;
    opacity: 0.8;
  }
</style>
