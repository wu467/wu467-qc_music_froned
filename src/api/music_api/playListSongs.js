// 获取歌单里的歌曲
import axios from 'axios'

export function getPlayListSongs(content_id) {
        return axios.get("/api/songlist?id="+content_id)
}

