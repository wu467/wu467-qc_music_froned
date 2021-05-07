<template>
    <article class="message">
        <div class="message-header">
         <p>🥳 每日歌词</p>
        </div>
        <div class="message-body">
            <div class="has-text-left block">
                {{lyrics.content}}
            </div> 
            <div class="has-text-right">
                 -{{'by '+lyrics.author}}
            </div>        
             <a href="/back/notice/findAllNotice">查询所有系统通知</a>
        </div>
    </article>
</template>

<script>

// import {getNotices} from '@/api/notices'

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

</style>
