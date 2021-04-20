<template>
  <div>
    <!--通知栏-->
    <div class="box">🔔  {{notice.content}} </div>

    <!-- 内容 -->
    <div class="columns">
      <div class="column">
        <!-- 侧边栏 -->
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
import {getNotices} from '@/api/notices'
import LeftSidebar from '@/views/sidebar/LeftSidebar'
import MainList from '@/views/list/MainList'

export default {
  components: { LeftSidebar, MainList },
  name: 'Home',
  data() {
    return {
      notice: {
        content: '这是测试阶段、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、留言板'
      },

    }
  },
  created() {
    this.fetchNotices()
  },
  methods: {
    async fetchNotices() {
      getNotices().then((value) =>{
        const {data} = value
        this.notice = data
      })
    }
  }
}


</script>

<style >

</style>
