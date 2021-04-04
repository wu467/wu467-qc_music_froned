<template>
  <div>
    <!--通知栏-->
    <div class="box">🔔  {{notices}} </div>

    <!-- 内容 -->
    <div class="columns">
      <div class="column">区域一</div>
      <div class="column is-three-quarters">区域二</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      notices: '版本更新',
    }
  }
}
</script>
