import axios from 'axios'

/**
 * 获取歌曲歌词
 * @param {歌曲mid} songMid 
 * @returns 
 */
export function getLyric(songMid) {
    return axios.get("/api/lyric?songmid="+songMid)
}

