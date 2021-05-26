import axios from 'axios'

/** 整合各个获取数据的api
 * 
 * @param {*} status 调用请求路径的标识
 * @param {*} content 不确定内容，当shareList组件调用时，值为歌单id。当search组件调用时，值为搜索关键字
 * @returns 返回歌曲数据
 */
export function getData(status,content) {
    console.log("当前是：  "+status+'  '+content)
    if (status == 'new') {  // 获取新歌推荐
        return axios.get("/api/new/songs?type=1")
    } else if (status == 'share') {   // 获取分享歌单歌曲
        return axios.get("/api/songlist?id="+content)
    } else if (status == 'search') {    //获取搜索结果
        return axios.get("/soso/fcgi-bin/client_search_cp?p=1&n=70&w="+content+"&format=json")
    } else {
        console.log("请求Api错误")
    }
}

