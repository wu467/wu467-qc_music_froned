<template>
    <article class="message">
        <div class="message-header">
         <p>🥳 个人信息</p>
        </div>
        <div class="message-body">
            <p> {{lyrics.content}} </p>
            <p> <strong>{{lyrics.author}} </strong> </p>
        </div>
    </article>
</template>

<script>

export default ({
    name: 'DailyLyrics',
    data() {
        return {
            lyrics: {content:'落花有意随流水，流水无情恋落花', author:'陈奕迅'}
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
