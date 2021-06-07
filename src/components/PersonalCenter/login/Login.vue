<template>
    <div class="container is-fluid">
        <div class="right_container">
            <h1>用户登录</h1>
            <div class="right_main">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
                        <el-input type="text" maxlength="10" v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
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
            console.log('提交错误！');
            return false;
          }
        });
      },
    }
}

</script>

<style >
    html {
        width: 100%;
        height: 100%;
        background-image: url("../../../assets/lm.jpg");
        background-size: cover;    
    }
    .right_container {
        width: 550px;
        float: left;
        margin-top: 10%;
        margin-left: 5%;
    }
    h1 {
      font-family:华文行楷;
      font-size: 60px;
      padding-left: 210px;
      padding-bottom: 25px;
    }
    .btn {
       margin-left: 145px;
       width: 150px;
    }
</style>
