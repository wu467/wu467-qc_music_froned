module.exports = {
    devServer: {
        port: 8080, // 设置本地服务器端口号
        host: 'localhost',  //设置本地域名
        open: true, //配置自动启动浏览器
        proxy: { // 配置跨域
            // 拦截请求以 '/api' 开头的地址
            '/api': {   
                target: 'http://localhost:3300/',  //要跨域的域名
                changOrigin: true,  //是否开启跨域
                timeout: 30000,     //设置请求超时的时间
                pathRewrite: {
                    '^/api': ''
                }
            },
            // 拦截请求以 '/搜搜' 开头的地址  搜索api
            '/soso': {   
                target: 'https://c.y.qq.com',  //要跨域的域名
                changOrigin: true,  //是否开启跨域
                timeout: 30000,     //设置请求超时的时间
                pathRewrite: {
                    '^/soso': '/soso'
                }
            },
            // 拦截请求以 '/pic' 开头的地址  获取歌曲图片
            '/pic': {   
                target: 'http://y.gtimg.cn/',  //要跨域的域名
                changOrigin: true,  //是否开启跨域
                timeout: 30000,     //设置请求超时的时间
                pathRewrite: {
                    '^/pic': ''
                }
            },
            // 拦截向后台的请求
            '/back': {
                target: 'http://localhost:8081/',
                changOrigin: true,  //是否开启跨域
                timeout: 30000,     //设置请求超时的时间
                pathRewrite: {
                    '^/back': ''
                }
            }
        }
    }
}          