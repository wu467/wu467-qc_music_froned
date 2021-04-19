<template>
    <article class="message">
        <div class="message-header">
         <p>🥳 每日歌词</p>
        </div>
        <div class="message-body">
            <p> {{lyrics.content}} </p>
            <strong>--{{lyrics.author}} </strong>
        </div>
    </article>
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

</style>
