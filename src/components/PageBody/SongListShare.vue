<template>
<div>
  <el-row>
    <el-col :span="6" v-for="(item, index) of list" :key="index" >
      <el-card :body-style="{ padding: '0px' }">
        <img v-bind:src="item.cover" class="image">
        
      </el-card>
      <div style="padding: 14px;">
          <span>{{item.title}}</span>
        </div>
    </el-col>
  </el-row>
</div>

</template>


<script>
import {getSongList} from '@/api/music_api/SongList'


export default ({
    name: 'SongListShare',
    data() {
      return {
        list: []
      }
    },
    created(){
        this.fetchSongList()
      },
      methods: {
        async fetchSongList(){
          getSongList().then((response) =>{
             const value = response.data  // http响应对象的data属性（json格式）
             this.list = value.data.list 
             console.log(this.list); // http响应对象          
          })
        }
      },
})
</script>

<style>

  .el-card {
    min-width: 200x;
    margin-right: 25px;
    /* transition: all .5s; */
  }

  span {
    font-size: 10px;
  }

  /* 鼠标悬浮图片变大过渡 */
  img{
    cursor: pointer;
    transition: all 0.6s;
  }

  img:hover{
    /* 鼠标悬浮图片变大 */
    transform: scale(1.1);
    /* 鼠标悬浮图片变灰和透明 */
    filter:alpha(Opacity=80);
    -moz-opacity:0.7;
    opacity: 0.7;
  }
</style>
