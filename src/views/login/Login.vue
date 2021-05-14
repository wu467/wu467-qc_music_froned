<template>
     <el-container>
    <el-aside>aside</el-aside>
    <el-container>
        <el-main>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input type="text" maxlength="10" v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <a href="/back/user/signOut">退出登录</a>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
 </el-container>
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
