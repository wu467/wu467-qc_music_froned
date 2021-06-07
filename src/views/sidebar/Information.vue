<template>
        <article class="message is-success">
            <div class="message-header">
                <p>🧘 个人信息</p>
            </div>
            <div class="section">
                <!-- 存在用户cookie，显示用户个人信息 -->
                <div v-if="!this.infoVisible">
                    <el-avatar shape="square" :size="80" :src="url"></el-avatar>
                    <div class="username">
                        <span>{{this.userCookie}}</span>
                        <p><span>收藏歌曲：{{this.$store.state.songCount}}首</span></p>
                        <p>
                            <router-link :to="'/user/resPassword'" target='_blank' style="text-decoration: none">
                                 <a style="text-decoration: none">修改密码</a>
                            </router-link>
                            <span v-html="'&nbsp;'"/><span v-html="'&nbsp;'"/><span v-html="'&nbsp;'"/>                              
                            <a href="/back/user/signOut" style="text-decoration: none">退出登录</a>
                        </p>
                    </div>
                </div>

                <!-- 不存在，显示登陆与注册按钮 -->
                <div v-if="this.infoVisible" class="btn">
                    <!-- 跳转到登录页面 -->
                    <router-link :to="'/Login'" target='_blank' style="text-decoration: none">
                        <b-button  size="is-medium" type="is-success" outlined>💡 登陆</b-button>
                    </router-link>
                    <span v-html="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"/>   <!-- 解决占位符在vue中无效的方法 -->
                    <!-- 跳转到注册路由 -->
                    <router-link :to="'/Register'" target='_blank' style="text-decoration: none">
                        <b-button  size="is-medium" type="is-danger" outlined>🎉注册</b-button>
                    </router-link>
                </div>
            </div>
        </article>
</template>

<script>
import {getCookie} from '@/utils/auth'

export default ({
    name: 'DailyLyrics',
    data() {
        return {
            userCookie: '',  //用户名
            infoVisible: true,  //信息是否可见
            url: 'https://thirdqq.qlogo.cn/g?b=sdk&k=BicK8wRNSiaxVuUxSDSkkH9A&s=140&t=1617896099'
        }
    },
    beforeMount() {
        // 该组件在创建完先进行判断是否存在用户cookie，如果存在则该组件显示用户基本信息，不存在则显示登录注册按钮
        const cookie = getCookie('username');
        this.userCookie = cookie
        // 根据获取的cookie是否为空，infomation组件显示不同的内容
        if(cookie != null){
            console.log("不为空")
            this.infoVisible = false;
        } else {
            console.log("cookie是空的")
            this.infoVisible = true;
        }
    },
    methods: {

    }
})
</script>

<style scoped>

    .section{
        height: 115px;
        width: 300px;
        padding: 20px;
        margin: 0%;
    }
    .username{
        margin-top: -80px;
        margin-left: 100px;
    }
    .btn {
        margin-left: 15px;
        margin-top: 8px;
    }

</style>
