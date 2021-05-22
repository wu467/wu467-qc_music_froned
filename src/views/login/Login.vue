<template>
    <div class="container">
        <div class="aside">
            <el-carousel  height="720px" indicator-position="outside">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="right_container">
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
            console.log('error submit!!');
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
        width: 1500px;
        height: 720px;
        border: 1px solid red;
        float: left;
    }
    .aside{
        width: 670px;
        height: 720px;
        border: 1px solid green;
        float: left;
    }
    .right_container{
        width:  670px;
        height: 70px;
        border: 1px solid red;
        float: left;
        margin-right: 0%;
    }
    .right_main{
        text-align: center;
        /* border: 1px solid red; */
        width: 450px;
        height: 200px;
        margin-left: 80px;
        margin-top: 250px;
    }

    /* 轮播图 */
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 720px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
