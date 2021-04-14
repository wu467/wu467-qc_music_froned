import axios from 'axios'

export function getPlayList() {
    return axios.get("/api/recommend/playlist/u")
}

