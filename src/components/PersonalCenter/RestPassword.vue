<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
            <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
            <el-input v-model.number="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn">
            <el-button type="primary" @click="submitForm()">修改密码</el-button>
            <el-button type="success" @click="fetchCode()" v-show="sendAuthCode">获取验证码</el-button>
            <el-button type="info" v-show="!sendAuthCode" disabled>{{this.auth_time}}s后重新获取</el-button>
          </div>
        </el-form-item>
    </el-form>
</template>

<script>
import {resPassword} from "@/api/backStage_api/resPasswd"
import {sendCode} from "@/api/backStage_api/sendCode"
import {getCookie} from '@/utils/auth'

export default {
    data() {
      var checkCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.newPass !== '') {
            this.$refs.ruleForm.validateField('newPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value === this.ruleForm.pass) {
          callback(new Error('新密码不能为原密码！'));
        } else {
          callback();
        }
      };
      return {
        sendAuthCode:true, /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 10,  //按钮禁用倒计时时间
        randomNum: '',  //生成的验证码
        userEmail: '', //存储从cookie中获取到的用户email
        ruleForm: {
          pass: '',
          newPass: '', 
          code: '',     //填入的验证码
        },

        rules: {
            pass: [
            { validator: validatePass, trigger: 'blur' }
            ],
            newPass: [
            { validator: validatePass2, trigger: 'blur' }
            ],
            code: [
            { validator: checkCode, trigger: 'blur' }
            ]
        },
      };
    },
    created() {
      this.userEmail = getCookie('userMail')
    },
    methods: {
      submitForm() {
          if(parseInt(this.ruleForm.code) !== parseInt(this.randomNum)) {
            alert("验证码输入错误！")
            return false;
          }
          else if (this.ruleForm !== null) {
            // 向后端提交修改密码申请
            resPassword(this.userEmail, this.ruleForm.newPass)
            alert('submit!');
          } else  {
            console.log('error submit!!');
            return false;
          }
        this.$router.replace('/')
      },
      fetchCode(){
        //生成六位随机数
        this.randomNum = Math.random().toFixed(6).slice(-6)
        // 将验证码和储存用户邮箱的cookie发送给后端
        sendCode(this.userEmail, this.randomNum)
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
      }
    }
}
</script>


<style >
  .demo-ruleForm {
    width: 500px;
    margin-top: 12%;
    margin-left: 30%;
  }
  .btn {
    margin-left: 20%;
  }
  html {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/register_1.png");
    background-size: cover;    
  }
  .el-input__inner {
    background-color:transparent;
  }
</style>