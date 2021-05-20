<template>
    <article class="message">
        <div class="message-header">
         <p>🥳 正在播放</p>
        </div>
        <div class="message-body">
            <div id="play" class="music-play-page">
                <div class="music-album">
                        <img :src="this.$store.state.picUrl"/>
                </div>
            </div>
        </div>

        <a href="/back/notice/findAllNotice">查询所有系统通知</a>
    </article>
</template>

<script>

export default ({
    name: 'play',
    data() {
        return {
            picUrl: "",
        }
    },
    components: {
    },
    created() {
        
    },
    methods: {

    }
})
</script>

<style scoped>


</style>
