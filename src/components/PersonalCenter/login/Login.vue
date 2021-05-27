<template>
    <div class="container">
        <div class="aside">
            <el-carousel  height="700px" indicator-position="outside">
                <el-carousel-item v-for="item in pics" :key="item.url">
                    <img :src="item.url"/>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="right_container">
            <img src="@/assets/qcyy.png" class="qcyy"/>
            <div class="right_main">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
                        <el-input type="text" maxlength="10" v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {toLogin} from '@/api/backStage_api/toLogin.js'

export default {
    data() {
        var checkName = (rule, value, callback) => {
            if (!value) {
               return callback(new Error('用户名不能为空'));
            }
            callback();
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
               callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.password !== '') {
                   this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        return {
            pics: [
                { url: require("@/assets/loginImg/p1.png") },
                { url: require("@/assets/loginImg/1.jpg") },
                { url: require("@/assets/loginImg/1.jpg") },
                { url: require("@/assets/loginImg/1.jpg") }
            ],
            ruleForm: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { validator: checkName, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],           
            }
        }
    },
    methods: {
      submitForm(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
            toLogin(this.ruleForm).then((response) => {
                console.log("java传过来的");
                console.log(response)
                //指定跳转地址
                this.$router.replace('/')
            });
          } else {
            console.log('提交错误！');
            return false;
          }
        });
      },
    }
}

</script>

<style scoped>
    /* 页面布局 */
    .container{
        max-width: 1500px;
        height: 720px;
        float: left;
        padding-left: 50px;
    }
    .aside{
        width: 700px;
        height: 720px;
        float: left;
    }
    .right_container{
        float: left;
        width: 500px;
        height: 720px;
    }
    .right_main{
        text-align: center;
        width: 450px;
        height: 250px;
        margin-left: 180px;
        margin-top: 10px;
        padding-top: 40px;
        padding-right: 80px;
    }
    .qcyy {
        margin-left: 160px;
        margin-top: 100px;
    }
</style>
