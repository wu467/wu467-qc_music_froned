import axios from 'axios'

/**
 * 获取歌曲播放链接
 */
export function getPlayMusic(songmid){
    return axios.get("/api/song/urls?id="+songmid)
}
