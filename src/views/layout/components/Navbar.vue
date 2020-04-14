<template>
  <div class="iheader" style="float: none">
    <div class="ilogo">
      <img src="@/assets/sys_images/logo.png" width="25px" height="auto">
      <em>失联修复</em>
    </div>
    <i id="bars" class="fa fa-bars" title="侧栏菜单展开/隐藏"/>
    <!--顶部右侧图标-->
    <div class="itools">
      <el-popover
        placement="bottom"
        width="200"
        trigger="click">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo">
<!--          <el-submenu-->
<!--            index="1">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-location"/>-->
<!--              <el-button type="text" @click="dialogPasswordVisible = true">-->
<!--                <span>修改密码</span>-->
<!--              </el-button>-->
<!--            </template>-->
<!--          </el-submenu>-->
          <el-submenu
            index="2">
            <template slot="title">
              <i class="el-icon-location"/>
              <el-button type="text" @click="logOut">
                <span>退出</span>
              </el-button>
            </template>
          </el-submenu>
        </el-menu>
        <a id="fa-user" slot="reference" class="fa fa-user" title="我的账户信息">欢迎：{{ name }}</a>
      </el-popover>
    </div>
    <!--修改密码 - 弹出框-->
    <el-dialog :visible.sync="dialogPasswordVisible" title="修改密码">
      <el-form ref="passForm" :model="passForm" :rules="rules" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="passForm.newPass" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="passForm.checkPass" type="password" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('passForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('passForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import md5 from 'js-md5';
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import { removeToken } from '@/utils/auth'
import { changePass } from '@/api/login'

export default {
  created() {
    // this.initWebSocket();
    // this.userPush();
  },
  destroyed() {
    this.websock.close() //离开路由之后断开websocket连接
  },
  components: {
    Hamburger
  },
  data() {
    var validatePass0 = (rule, value, callback) => {
      var re =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,32}$/
      if (value === '') {
        callback(new Error('请输入新密码'))
      // } else if (value === this.passForm.oldPass) {
      //   callback(new Error('新密码不能和原密码相同!'))
      } else {
        if(!re.test(value)){
          callback(new Error("密码至少包含大写字母，小写字母，数字，且不少于8位"))
        }else if(this.passForm.checkPass !== '') {
          this.$refs.passForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passForm: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      listQuery: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      dialogPasswordVisible: false,
      rules: {
        // oldPass: [
        //   { required: true, message: '请输入原密码', trigger: 'blur' }
        // ],
        newPass: [
          { required: true, validator: validatePass0, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      },
      websock: null,
      pushMessage:{
        title:'提示',
        content:'内容'
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'roles'
    ])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$refs[formName].resetFields()
          this.listQuery.newPass = md5(this.passForm.newPass)
          this.listQuery.checkPass = md5(this.passForm.checkPass)
          // alert(this.listQuery.newPass)
          changePass(this.listQuery).then(response => {
            console.log(response)
            // 加 notify控件提醒
            // if (response.msg === '原密码错误') {
            //   alert('原密码错误')
            // }
          })
          this.dialogPasswordVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    userPush() {
      this.$notify({
        title: this.pushMessage.title,
        message: this.pushMessage.content,
        duration: 0
      });
    },
    resetForm(formName) {
      this.dialogPasswordVisible = false
      // this.passForm = {}
      this.$refs[formName].resetFields()
    },
    logOut() {
      // removeToken()
      this.$store.dispatch('FedLogOut').then(() => {
        this.$router.push(`/views/login/index`)
      })
    },
    //  webSocket部分
    initWebSocket(){ //初始化weosocket
      const wsuri = "ws://127.0.0.1:8081";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      let actions = {"test":"12345"};
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收
      const redata = JSON.parse(e.data);
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data);
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e);
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .iheader{
    width: 100%;
    height: 40px;
    color: #fff;
    background: #333;
    /*overflow: hidden;*/
    float: left;

  }

  .iheader .ilogo{
    line-height: 40px;
    width: 180px;
    height: 40px;
    float: left;
  }

  .iheader .ilogo img{
    float: left;
    height: 26px;
    margin: 8px 5px;
    width: 26px;
  }
  .iheader .ilogo em{
    display: inline-block;
    float: left;
    font-size: 1.2em;
    cursor: default;
    font-family: arial, verdana, "trebuchet ms", "微软雅黑";
    font-style: normal;
    font-weight: bold;
  }

  .iheader i.fa-bars {
    background: #c23232;
    border-radius: 3px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    float: left;
    font-size: 1.2em;
    height: 26px;
    line-height: 26px;
    margin: 7px;
    padding: 0 6px;
    width: auto;
    padding-top: 1px;
  }

  .iheader .imenu{
    line-height: 40px;
    /*width: 130px;*/
    height: 40px;
    float: left;
  }

  .iheader .imenu .imenuitem{
    line-height: 40px;
    /*width: 130px;*/
    height: 40px;
    float: left;
  }

  .iheader .itools{
    height: 40px;
    width: auto;
    position: absolute;
    right: 10px;
    top: 0;
    float:right;
    z-index:101;
  }
  .iheader .itools a{
    display: inline-block;
    float: right;
    margin: 12px 10px;
    font-size: 1.2em;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.85);
  }
  .iheader .itools a:hover{
    color: #fff;
    text-decoration: none;
  }

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
</style>

