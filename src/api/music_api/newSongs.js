import axios from 'axios'

export function getNewSongs() {
    return axios.get("/api/new/songs?type=1")
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

