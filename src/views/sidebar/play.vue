<template>
    <article class="message">
        <div class="message-header">
         <p>🥳 正在播放</p>
        </div>
        <div class="messageBody">
            <div id="play" class="music-play-page">
                <div class="music-album">
                    <img :src="this.$store.state.picUrl"/>
                    <!-- 歌名 -->
                    <p>{{this.$store.state.songName}}</p>
                    <div class="aud">
                        <!-- 歌词 -->
                        <div class="lyric_area">
                            <ul ref="lyricUL" id="lyric">
                                <li v-for="(item, index) in showLyric" :key="index" :class="liList[index]" >{{item}}</li>
                            </ul>
                        </div>
                        <!-- 播放器 -->
                        <audio id="audio" controls preload autoplay @timeupdate="updateTime"  @seeking="toSeek" @seeked="updateTime" ref="audio" :src="this.$store.state.musicUrl" >
                        </audio>
                    </div>
                </div>
            </div>
        </div>

    </article>
</template>

<script>
import {getLyric} from '@/api/music_api/lyric' 
export default ({
    name: 'play',
    data() {
        return {
            currentTime:'',  //当前播放时间
            lyricsObjArr:[],    //存放处理歌词后的数组
            lyricIndex:'1',      //歌词播放时下标的标记
            showLyric : [],   //存放要在屏幕上显示的三句歌词
            liList: ["ll1", "ll2", "ll3"], //给每个li绑定的class
            toSleep: false
        }
    },
    computed: { //利用computed间接监听vuex中state的数据,如果vuex中存储的songMid改变则重新请求获取歌词
        monitorData(){
            return this.$store.state.songMid;
        }
    },
    watch: {
        monitorData(){
            this.lyricsObjArr.splice(0, this.lyricsObjArr.length);  //清除存储歌词的数组为空
            this.showLyric.splice(0, this.showLyric.length);
            this.lyricIndex = 1
            this.fetchLyric(this.$store.state.songMid)
            this.toSleep = true
        }
    },
    methods: {
        toSeek() {      // audio中的钩子方法，当歌曲跳转时执行
            this.lyricIndex = 0
        },
        updateTime() {  //audio中的钩子方法，当当前播放时间改变时执行
            // audio的属性，获取歌曲当前播放的时间
            var audio = document.getElementById("audio")
            this.currentTime = audio.currentTime;  
            // 匹配歌词
            for (let i = this.lyricIndex; i < this.lyricsObjArr.length; i++) {
                if(this.toSleep) {      //让方法睡眠一秒
                    this.sleep(1000);
                }
                if (parseInt(this.currentTime) >= (parseInt(this.lyricsObjArr[i].time))) {
                    if(this.lyricsObjArr[i].lyric != this.lyricsObjArr[this.lyricIndex].lyric){
                      this.lyricIndex = i
                      this.showLyric.length = 0;
                      this.showLyric.push(this.lyricsObjArr[i-1].lyric)
                      this.showLyric.push(this.lyricsObjArr[i].lyric)
                      this.showLyric.push(this.lyricsObjArr[i+1].lyric)                                            
                    }
                }
            }
        },
        sleep : function(millisecond){
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, millisecond)
            })
        },
        fetchLyric(songMid){    // 获取歌词
            getLyric(songMid).then((response) => {
                let lyric = response.data.data.lyric
                // 拿到每一行歌词
                const regNewLine = /\n/
                const lineArr = lyric.split(regNewLine) // 每行歌词的数组
                // 分隔时间和歌词
                const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
                // 对lineArr数组进行遍历分隔
                lineArr.forEach(item => {
                    if (item === '') return
                     const obj = {}
                     const time = item.match(regTime)

                     obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
                     obj.time = time ? this.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
                    //  obj.uid = Math.random().toString().slice(-6)
                     if (obj.lyric !== '') {
                        this.lyricsObjArr.push(obj)
                     }
                })
            })                    
        },
        formatLyricTime (time) { // 格式化歌词的时间 转换成 sss:ms
            const regMin = /.*:/
            const regSec = /:.*\./
            const regMs = /\./

            const min = parseInt(time.match(regMin)[0].slice(0, 2))
            let sec = parseInt(time.match(regSec)[0].slice(1, 3))
            const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
            if (min !== 0) {
                sec += min * 60
            }
            return Number(sec + '.' + ms)
        }
    },
})
</script>

<style scoped>

    .music-play-page {
        z-index: 5;
    }

    .music-play-page p{
        margin-top: 0%;
        width: 320px;
        text-align: center;
        font-size: 10px;
        color: #333333;
    }

    .music-album img{
        width: 100%;
        margin-top: 2px;
        margin-left: 9px;
        margin-bottom: 0%;
    }

    .messageBody{
        width: 300px;
        height: 475px;
    }

    .aud {
        margin-top: 100px;
        margin-left: 10px;
    }

    .lyric_area{/*歌词显示区域*/
        margin-top: -100px;
    }
    #lyric{/*歌词列表*/
        text-align: center;
        line-height: 25px;/*行高，这个值要用在歌词滚动距离上*/
        height: 80px; /*  歌词区域高度 */
        width: 290px;
    }

    .ll1 {
        font-size: 15px;
        color: #909399;
    }
    .ll3 {
        font-size: 15px;
        color: #909399;
    }
    .ll2 {
        font-size: 20px;
        color: #48c774;
    }


</style> 