<template>
  <div class="soso">
    <el-row>
      <el-col :span="6">
        <span v-html="'&nbsp;'"/>
        </el-col>
      <el-col :span="10">
        <el-input type="text" v-model="searchVal" placeholder="搜你想搜~" clearable></el-input>
      </el-col>
      <router-link :to="'/ListSongs/'+this.searchVal" target='_blank'>
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
    }
  },
  methods: {
  }

}
</script>

<style scoped>

</style>