import axios from 'axios'

export function getSearch(keyWord){
    // console.log(page+keyWord)
    // return axios.get("https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p="+page+"&w="+keyWord)
    return axios.get("/soso/fcgi-bin/client_search_cp?p=1&n=70&w="+keyWord+"&format=json")
}