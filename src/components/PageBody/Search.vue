<template>
  <div class="soso">
    <el-row>
      <el-col :span="6"> .</el-col>
      <el-col :span="10">
        <el-input type="text" v-model="searchVal" placeholder="搜你想搜~"></el-input>
      </el-col>
      <router-link :to="'/ListSongs/'+this.searchVal+'/'+rets" target='_blank'>
        <el-col :span="2">
            <el-button type="primary" icon="el-icon-search"></el-button>
        </el-col>
      </router-link> 
    </el-row>
  </div>
</template>

<script>


export default {
  data() {
    return {
      searchVal: '',
      rets: this.ret
    }
  },
  props: {
    ret:{
      type: String,
    }
  },
  methods: {
  }

}
</script>

<style scoped>

</style>