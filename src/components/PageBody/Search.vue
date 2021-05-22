<template>
  <div>
    <div class="soso" v-if="soso">
      <el-row>
        <el-col :span="6">
            <span v-html="'&nbsp;'"/>
        </el-col>
        <el-col :span="10">
            <el-input type="text" v-model="toSonData.unsureContent" placeholder="搜你想搜~" clearable></el-input>
        </el-col>
        <el-col :span="1">
            <el-button type="primary" icon="el-icon-search" @click="showSoso"></el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 子组件 -->
    <base-list-songs v-bind:parentComponentData="toSonData" v-if="!soso" @closeBaseListSongs="showSoso" />
  </div>

</template>

<script>
import BaseListSongs from '@/components/PageBody/BaseListSongs'

export default {
  data() {
    return {
      toSonData: {  // 传递给子组件的数据（对象形式）
        mark: 'search',
        unsureContent: ''
      },
      soso: true,   //控制子组件的显示与隐藏
    }
  },
  methods: {
    //子组件与父组件间的通信，子组件点击返回按钮后执行
    showSoso(){
      this.soso = !this.soso
    }
  },
  components: {
    BaseListSongs,
  }

}
</script>

<style scoped>

</style>