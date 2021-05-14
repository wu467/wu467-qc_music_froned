<template>
  <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="最新歌曲" name="first"> <new-songs/> </el-tab-pane>
    <el-tab-pane label="歌单分享" name="second"><play-list-share/> </el-tab-pane>
    <el-tab-pane label="搜一搜" name="fourth"><search/></el-tab-pane>
    <el-tab-pane label="我的收藏" name="third"><my-collection/></el-tab-pane>
  </el-tabs>
</template>

<script>
import NewSongs from '@/components/PageBody/NewSongs'
import PlayListShare from '@/components/PageBody/PlayListShare'
import Search from '@/components/PageBody/Search'
import MyCollection from '@/components/PageBody/MyCollection'

  export default {
    data() {
      return {
        activeName: 'first',
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components: {
      NewSongs,
      PlayListShare,
      Search,
      MyCollection
    },

  };
</script>