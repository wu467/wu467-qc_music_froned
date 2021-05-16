import axios from 'axios'

/**
 * 获取用户收藏的歌曲信息
 * 根据用户收藏歌曲的songmid集合请求qq音乐api接口，获取歌曲信息
 * @param {*} songmidList 歌曲songmid数组
 * @returns 
 */
export function getSongBatch(songmidList){
    // 将songmidList数组循环遍历，拼接为一个字符串
    var songmids = ""
    for (const i in songmidList) {
        const mid = songmidList[i]
        songmids = songmids + mid + ","
    }
    return axios.get("/api/song/batch?songmids="+songmids)
}
