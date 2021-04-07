<template>
    <el-card class="header">
          <div slot="header">
              <span>🥳 个人信息 </span>
          </div>
          <div >
             
          </div>
    </el-card>
</template>

<script>

export default ({
    name: 'DailyLyrics',
    data() {
        return {
            lyrics: {content:'童年的纸飞机~~~', author:'周杰伦'}
        }
    },
    create() {
        this.fetchDailyLyrics()
    },
    methods: {
        fetchDailyLyrics() {

        }
    }
})
</script>

<style scoped>
    .el-card{
            margin-bottom:20px; /*下边距*/
        }
</style>
