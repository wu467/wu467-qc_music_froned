<template>
  <div class="container">
    <!--通知栏-->
    <div class="box"><p>🔔 {{this.content}} </p></div>
    <!-- 内容 -->
    <div class="columns">
      <div class="column">
        <!-- 左侧边栏 -->
        <left-sidebar/>
      </div>
      <div class="column is-three-quarters">
        <!-- 右侧主体 -->
        <main-list/>
      </div>
    </div>
  </div>
</template>

<script>
import {getNotices} from '@/api/backStage_api/notices'
import LeftSidebar from '@/views/sidebar/LeftSidebar'
import MainList from '@/views/list/MainList'

export default {
  components: { LeftSidebar, MainList },
  name: 'Home',
  data() {
    return {
      notice: '',   //所有通知数组
      content: '欢迎来到',  //通知内容
      n_index: 0,   //通知数组下标
    }
  },
  created() {
    this.fetchNotices()
  },
  mounted() {
    setInterval(this.get, 5000)
  },
  methods: {
    async fetchNotices() {
      getNotices().then((response) =>{
        this.notice = response.data
      })
    },
    //定时器方法
    get(){
      if(this.n_index == this.notice.length){
        this.n_index = 0;
      }
      this.content = this.notice[this.n_index++].content;
    }
  }

}


</script>

<style scope>
  html {
    width: 100%;
    height: 100%;
    background-image: url("../assets/06.jpg");
    background-size: cover;
  }    
</style>

