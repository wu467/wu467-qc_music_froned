import axios from 'axios'

export function getSongList() {
    return axios.get("/api/recommend/playlist/u")
}

