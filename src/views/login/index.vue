<template>
  <div class="login-container">
    <div class="login-header">
      <div class="ilogo">
        <img src="@/assets/sys_images/logo.png" width="" height="">
        <em><b>失联修复</b></em>
        <el-button type="primary" style="float: right;margin-top: 5px;margin-right: 2%" @click="dialogFormVisible = true">登录</el-button>
      </div>
      <div class="imsg"/>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" top="20vh" class="login-containers" title="登录" center width="30%">
      <el-form ref="loginForm" :model="loginForm" :rules="rules">
        <el-form-item class="input_box">
          <span>
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="loginForm.man" auto-complete="off" placeholder="请输入用户名" autofocus @keyup.enter.native="focusToPSW" />
        </el-form-item>
        <el-form-item class="input_box">
          <span>
            <svg-icon icon-class="password" />
          </span>
          <el-input ref="ans" v-model="loginForm.ans" :type="passwordType" auto-complete="off" placeholder="请输入密码" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item class="input_box">
          <span>
            <svg-icon style="float: left;font-size: large" icon-class="check"/>
          </span>
          <el-input v-model="loginForm.check.code" style="float: left;width: 55%;" auto-complete="off" placeholder="验证码" autofocus @keyup.enter.native="handleLogin" />
          <!--<img src="../../images/yzmtest.png" alt="" style="float:left;width:25%;height:44px;margin-left: 15px" @click="changeCheck">-->
          <img :src="checkSrc" alt="" style="float:left;width:25%;height:44px;margin-left: 15px" @click="changeCheck">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="handleLogin()">登 录</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { checks } from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        man: '',
        ans: '',
        check: {
          code: ''
        }
      },
      checkSrc: process.env.BASE_API + '/captcha/code.jpg',
      rules: {
        man: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        ans: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password',
      passwordType: 'password',
      redirect: undefined,
      dialogFormVisible: true,
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    handleLogin() {
     this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // this.loginForm.ans = "wh9528sl" + this.loginForm.ans + "#"
          // this.loginForm.ans = window.btoa(this.loginForm.ans)
          checks(this.loginForm.check).then(response => {
            console.log(response)
            if (response.data) {
              this.$store.dispatch('Login', this.loginForm).then(() => {
                this.loading = false
                this.$router.push({ path: this.redirect || '/userManage/userManage' })
              }).catch(() => {
                this.loading = false
              })
            } else {
              this.$message({
                showClose: true,
                message: '验证码校验错误!',
                type: 'waring'
              })
            }
          }).catch(response => {
            console.log(response)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    focusToPSW() {
      this.$refs.ans.focus()
    },
    changeCheck() {
      this.checkSrc = process.env.BASE_API + '/captcha/code.jpg?id=' + Math.random() * 10000
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
        this.type = ''
      } else {
        this.passwordType = 'password'
        this.type = 'password'
      }
    }
  }
}
</script>

<style lang="css">
  .login-container {
    with: 100%;
    height: 100%;
    background: url("../../images/login_bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .login-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    color: #fff;
    z-index: 10;
    background:rgba(0, 0, 0, 0.6);
  }

  .login-header .ilogo {
    width: 100%;
    height: 50px;
    float: left;
  }

  .login-header .imsg {
    width: auto;
    height: 50px;
    float: right;
    text-align: right;
    margin: 0 10px 0 0;
  }

  .login-bg {
    width: 100%;
    height: 100%;
    position: relative;
  }

  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    background-color: #fff;
    -moz-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    -khtml-user-select:none;
    user-select:none;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: FontAwesome,arial;
    font-weight: lighter;
    background: #fff;
  }

  .login-adv {
    display: block;
    position: relative;
    height: 35%;
    top: 0px;
    left: 0px;
    width: 100%;
    margin: 0;
    background: #eee none repeat scroll 0 0;
  }

  .carouse {
    width: 100%;
    height: 100%;
  }

  .carouse .CImg1 {
    height: 100%;
    background: url("../../images/login-bg_768.png") no-repeat;
    background-size: 100% 100%;
  }

  .carouse .CImg2 {
    height: 100%;
    background: url("../../images/login-bg2_768.png") no-repeat;
    background-size: 100% 100%;
  }

  .el-carousel__container {
    position: relative;
    height: 500px;
  }
  .input_box{
    width:80%;
    transform: translate(20%)
  }
</style>
<style lang="scss">
  $bg:#283443;
  $light_gray:black;/*文字颜色*/
  $cursor: black;/*光标颜色*/

  /* reset element-ui css */
  .login-containers {
    .el-input {
      width: 80%;
      display: inline-block;
      height: 47px;
      border-bottom: 1px solid black;
      input {
        background: transparent !important;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>
