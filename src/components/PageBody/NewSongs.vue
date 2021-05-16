<template>
    <base-list-songs v-bind:parentComponentData="toSonData" />    <!--引用子组件-->
</template>

<script>
import BaseListSongs from '@/components/PageBody/BaseListSongs'

export default ({
  data() {
    return {
      toSonData: {
        mark: 'new',    // 传递给子组件的数据
      }
    }
  },
  components: {
    BaseListSongs,
  }
})
</script>
