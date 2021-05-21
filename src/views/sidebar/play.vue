<template>
    <article class="message">
        <div class="message-header">
         <p>🥳 正在播放</p>
        </div>
        <div class="messageBody">
            <div id="play" class="music-play-page">
                <div class="music-album">
                    <img :src="this.$store.state.picUrl"/>
                    <p>{{this.$store.state.songName}}</p>
                    <div class="aud">
                        <audio 
                            controls preload autoplay
                            @canplay="getDuration" @timeupdate="updateTime" 
                            ref="audio" 
                            :src="this.$store.state.musicUrl" 
                        >
                        </audio>
                    </div>

                </div>
                <div class="music-ctrl">

                </div>
            </div>
        </div>

    </article>
</template>

<script>
export default ({
    name: 'play',
    data() {
        return {
            // musicUrl: 'http://isure.stream.qqmusic.qq.com/C400001jtUoX1b2FgO.m4a?guid=2796982635&vkey=E9399115303F4BADB317C934F626E167C3EB395F06C86FB88305FFF058E2856C2089AE116E5ECFB77E5A41E8943124D86BFF7D577631CBFF&uin=&fromtag=99',
            currentTime:''
        }
    },
    components: {
    },
    methods: {
        getDuration() {
        console.log(this.$refs.audio.duration); //此时可以获取到duration
            this.duration = this.$refs.audio.duration;
        },
        updateTime(e) {
            const cTime = e.target.currentTime;  //获取audio当前播放时间
            this.currentTime = '0' + parseInt(cTime / 60) + ':' + parseInt(cTime % 60); //将获取到的时间转换为分秒
            console.log('0' + parseInt(cTime / 60) + ':' + parseInt(cTime % 60))
        },

        
    },
})
</script>

<style scoped>

    .music-play-page {
        z-index: 5;
    }

    .music-play-page p{
        text-align: center;
    }

    .music-album img{
        width: 100%;
        margin-top: 5px;
        margin-left: 9px;
    }

    .music-ctrl ul li {
        float: left;        /*将按钮排列成一行*/
        margin-right: 10px;
        margin-left: 7px;
        margin-bottom: 2px;
        margin-bottom: 0%;
    }
    .music-ctrl ul{
        width: 300px;
        height: 45px;
        margin-top: 120px;
    }
    .messageBody{
        width: 300px;
        height: 480px;
    }

    .aud {
        margin-top: 100px;
        margin-left: 10px;
    }


</style> 