<template>
<div id="building">
 <el-container>
    <el-aside>
      <p>项目简介</p>
      <span>
        一般在ssm框架的项目中，一般的数据流程都是前台页面---> ctrl层 ----> service层，dao层---> 数据库。form表单提交的数据类型到后端的controller层时，controller层接受的数据类型不一致时会报错。解决方法为：在数据由前台页面传递到controller层的流程中，一般会多写一个vo类，里面存放要从前台接收的属性，一般属性的类型根据前台传递的属性定，不一定跟实体的属性的类型一致。如果真的要将前台传递过来的数据保存到数据库的时候，就可以在service层，将封装在vo类里的数据通过getter方法取出数据在转换成相应的类型通过实体的setter方法封装到实体中，最后在保存到数据中。
      </span>
    </el-aside>
    <el-container>
        <el-main>
          <div>
            <h1>用户注册</h1>
          </div>
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
        auth_time: 10,  //按钮禁用倒计时时间
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
        //js获取验证码按钮元素，并切换为禁用状态
        this.sendAuthCode = false;
        //缓存当前的对象
        let _this = this   
        //使用定时器，倒计时禁用按钮
        var timer = setInterval(function () {
          _this.auth_time-- ;
          console.log(_this.auth_time)
          if (_this.auth_time === 0) {
            _this.sendAuthCode = true;
            _this.auth_time = 10;
            clearInterval(timer)
          }
        }, 1000)
      },
      toLogin(){
        this.$router.replace('/')
      }
    }
  }
</script>


<style>
  h1 {
    font-size: 50px;
    padding-top: 40px;
    margin-left: 32%;
    font-family:华文行楷;
  }
  p {
    text-align: center;
    font-size: 30px;
    font-family:华文行楷;
    margin-top: 20px;
  }
  span {
    font-size: 18px;
  }
  html {
    width: 100%;
    height: 100%;
    background-image: url("../../../assets/register_1.png");
    background-size: cover;
  }
  .el-form {
    text-align: center;
    width: 400px;
    margin-top: 30px;
    margin-left: 8%;
  }
  .formBorder{
    height: 400px;
    width: 600px;
    margin-left: 150px;
  }
  .el-aside {
    width: 100%;                
    height: 100%;
    border: solid 3px red;
    height: 100vh;
  }
  .el-input__inner {
    background-color:transparent;
  }
</style>
