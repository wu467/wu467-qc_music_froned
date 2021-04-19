import axios from 'axios'

/**
 * 获取推荐歌单
 */
export function getPlayList() {
    return axios.get("/api/recommend/playlist/u")
}

