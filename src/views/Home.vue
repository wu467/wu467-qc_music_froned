<template>
  <div>
    <!--通知栏-->
    <div class="box">🔔  {{notice.content}} </div>

    <!-- 内容 -->
    <div class="columns">
      <div class="column">区域一</div>
      <div class="column is-three-quarters">区域二</div>
    </div>
  </div>
</template>

<script>
import {getNotices} from '@/api/notices.js'


export default {
  name: 'Home',
  data() {
    return {
      notice: {
        content: '这是测试阶段'
      }
    }
  },
  created() {
    this.fetNotices()
  },
  methods: {
    async fetNotices() {
      getNotices().then((value) =>{
        const {data} = value
        this.notice = data
      })
    }
  }
}
</script>
