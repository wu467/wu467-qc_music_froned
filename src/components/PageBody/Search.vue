<template>
  <div>
    <el-row>
        <el-col :span="12">
          <el-input type="text" v-model="searchVal" placeholder="搜你想搜~"></el-input>
        </el-col>
        <el-col :span="4">
          <router-link tag="div" :to="'/SearchListSongs/'+ this.searchVal ">
            <el-button type="primary" icon="el-icon-search"></el-button>
          </router-link> 
        </el-col>
    </el-row>
  </div>
</template>

<script>


export default {
  data() {
    return {
      searchVal: '',
      hotWord:'',
    }
  },
  methods: {
  }
  

}
</script>