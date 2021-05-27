<template>
<div id="building">
 <el-container>
    <el-aside>aside</el-aside>
    <el-container>
        <el-main>
          <div class="formBorder">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input type="text" maxlength="10" v-model="ruleForm.userName" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="14">
                    <el-form-item label="验证码" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-button type="success" @click="fetchCode()" :disabled="this.btnStatus" :key="this.compoKey" id="btn">获取验证码</el-button>
                  </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    <el-button @click="resetForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
          </div>
        </el-main>
    </el-container>
 </el-container>
 </div>
</template>


<script>
  import {getEmail} from '@/api/backStage_api/getEmail'  //验证邮箱是否注册Api
  import {toRegister} from '@/api/backStage_api/toRegister'  //请求注册api 

  export default {
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        callback();
      };
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        } else {
            getEmail(value).then(Response => {
                if(!Response.data) {
                  callback();
                } 
                callback(new Error('邮箱已被注册！'));
            })
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        btnStatus: false,  //设置按钮是否禁用
        compoKey: 0,
        ruleForm: {
          userName: '',
          pass: '',
          checkPass: '',
          email: ''
        },
        rules: {
          userName: [
            { validator: checkName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
            { validator: checkEmail, trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            toRegister(this.ruleForm);
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      fetchCode(){
        //获取邮箱发送验证码，判断验证码是否正确，正确则将表单信息提交给后台注册
        
        //设置获取验证码按钮禁用60s
        var btn = document.getElementById("btn")
        this.btnTime(btn);

      },
      btnTime(btn){
        var num = 5
        this.btnStatus = true;
        var timer = setInterval(function () {
          num--
          btn.innerHTML = num + "s后重新获取"

          if (num === 0) {
            btn.innerHTML = '获取验证码';
            this.btnStatus = false;
            this.compoKey += 1;
            clearInterval(timer)
          }
        }, 1000)
      }
    }
  }
</script>


<style>
    #building {
      width: 100%;                
      height: 100%;
      height: 100vh;
      border: 2px solid greenyellow;
    }
    .el-form {
      text-align: center;
      width: 400px;
      margin-top: 45px;
      margin-left: 80px;
    }
    .formBorder{
      border: 2px solid greenyellow;
      height: 400px;
      width: 600px;
      margin-left: 200px;
      margin-top: 100px;
    }

    .el-aside {
      width: 100%;                
      height: 100%;
      border: solid 3px red;
      height: 100vh;
    }

</style>
