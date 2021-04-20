<template>
        <article class="message is-success">
            <div class="message-header">
                <p>🧘 个人信息</p>
            </div>
            <div class="section">
                <el-row>
                    <b-button  size="is-medium" type="is-success" outlined>💡 登录</b-button>
                    <span v-html="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"/>   <!-- 解决占位符在vue中无效的方法 -->
                    <b-button  size="is-medium" type="is-danger" outlined>🎉注册</b-button>
                </el-row>
            </div>
        </article>
</template>

<script>

export default ({
    name: 'DailyLyrics',
    data() {
        return {
            lyrics: {content:'落花有意随流水，流水无情恋落花', author:'陈奕迅'}
        }
    },
    create() {
        this.fetchDailyLyrics()
    },
    methods: {
        fetchDailyLyrics() {

        }
    }
})
</script>

<style scoped>
    .el-card{
        margin-bottom: 20px; /*下边距*/
    }
    .section {
        text-align: center;
    }
</style>
