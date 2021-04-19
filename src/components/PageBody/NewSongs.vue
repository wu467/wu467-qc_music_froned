<template>
    <base-list-songs v-bind:parentComponentData="toSonData" />
</template>

<script>
import BaseListSongs from '@/components/PageBody/BaseListSongs'

export default ({
  data() {
    return {
      toSonData: {
        mark: 'new',
      }
    }
  },
  components: {
    BaseListSongs,
  }
})
</script>
