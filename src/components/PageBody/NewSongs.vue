<template>
    <base-list-songs/>
</template>

<script>
import BaseListSongs from '@/components/PageBody/BaseListSongs'

export default ({
  data() {
    return {
      rets: this.ret,
    }
  },
  props: {
    ret:{
      type: String,
    }
  },
  components: {
    BaseListSongs,
  },
  create(){
    console.log(this.rets)
  }
})
</script>
