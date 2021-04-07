<template>
  <el-tabs  type="border-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="最新歌曲" name="first"> <popular-song/> </el-tab-pane>
    <el-tab-pane label="歌单分享" name="second"><song-list-share/></el-tab-pane>
    <el-tab-pane label="我的收藏" name="third">我的收藏</el-tab-pane>
    <el-tab-pane label="搜一搜" name="fourth">搜一搜</el-tab-pane>
  </el-tabs>

</template>

<script>
import PopularSong from '@/views/list/PopularSong'
import SongListShare from '@/views/list/SongListShare'

  export default {
    data() {
      return {
        activeName: 'second'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components: {
        PopularSong,
        SongListShare
    }
  };
</script>