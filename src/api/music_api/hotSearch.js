// 获取热搜
import axios from 'axios'
 
export function hotSearch() {
    return axios.get("/api/search/hot")
}