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
                    <el-form-item label="验证码" prop="yzm">
                        <el-input v-model="ruleForm.yzm"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-button type="success" @click="getAuthCode" v-show="sendAuthCode">获取验证码</el-button>
                    <el-button type="info" v-show="!sendAuthCode" disabled>{{this.auth_time}}s后重新获取</el-button>
                  </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    <el-button @click="toLogin()">登录</el-button>
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
  import {sendCode} from "@/api/backStage_api/sendCode" // 向后端传递填入的邮箱，请求发送验证码

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
      var checkYzm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码不能为空！'));
        } else if (value !== this.auto_yzm) {
          callback(new Error('验证码错误!'));
        } else {
          callback();
        }
      };
      return {
        sendAuthCode:true, /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 5,  //按钮禁用倒计时时间
        auto_yzm: '',  // 随机生成的六位验证码
        ruleForm: {
          userName: '',
          pass: '',
          checkPass: '',
          email: '',
          yzm: ''
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
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
            { validator: checkEmail, trigger: 'blur' }
          ],
          yzm : [
            { validator: checkYzm, trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            toRegister(this.ruleForm).then((res) => {
              if(res.code === 200 ) {
                alert("注册成功！")
                //跳转到登录页面
                this.$router.replace('/Login')
              }
            });
            alert('注册失败！');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getAuthCode : function(){
        //获取验证码前先判断邮箱是否已填，若为空则提示用户未填写邮箱，并返回
        var userEmail = this.ruleForm.email
        if (userEmail === '') {
          alert("邮箱未填写！")
          return;
        }
        //生成六位随机数验证码
        this.auto_yzm = Math.random().toFixed(6).slice(-6)
        // 将生成的验证码和填入的邮箱发送给后台
        sendCode(userEmail, this.auto_yzm)
        //js获取验证码按钮元素，并切换显示禁用30s倒计时按钮
        this.sendAuthCode = false;
        //缓存当前的对象
        let _this = this   
        //使用定时器，倒计时禁用按钮
        var timer = setInterval(function () {
          _this.auth_time-- ;
          console.log(_this.auth_time)
          if (_this.auth_time === 0) {
            _this.sendAuthCode = true;
            _this.auth_time = 5;
            clearInterval(timer)
          }
        }, 1000)
      },
      toLogin(){

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
