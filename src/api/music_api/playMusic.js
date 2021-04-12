import axios from 'axios'

export function getPlayMusic(songmid){
    return axios.get("/api/song/urls?id="+songmid)
    // .then(response=>{
    //     console.log("http请求成功")
    //     console.log(response); // http响应对象
    //     console.log(response.data); // 返回的数据
        
    // })
    // .catch(error=>{
    //     // 请求失败或者then里面代码出现错误时
    //     console.log("http请求失败或者then里面代码报错");
    //     console.log(error);
    //     console.log(error.response.data); // 打印来自服务器的错误信息提示
    // });
}
