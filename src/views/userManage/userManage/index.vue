<template>
  <el-row>
    <!--第一行-->

    <router-view/>

    <!--    编辑弹出框-->
    <el-dialog :visible.sync="dialogTableVisible_Details" title="用户详情" >
      <el-form :model="row_details" label-width="100px" class="inputTest">
        <el-form-item label="用户名：" >
          <el-input v-model="row_details.userName" autocomplete="off" readonly="true" class="elInput"/>
        </el-form-item>
        <el-form-item label="密码：" >
          <el-input v-model="row_details.loginPassword" type="password" autocomplete="off" readonly="true" class="elInput"/>
          <el-button size="small" class="elBtn" @click="changePSW">重置密码</el-button>
        </el-form-item>
        <el-form-item label="角色授予：" >
          <el-input v-model="row_details.roles" autocomplete="off" readonly="true" class="elInput"/>
          <el-button size="small" class="elBtn" @click="dialogRoleVisible = true">角色授予</el-button>
        </el-form-item>
        <el-form-item label="到期时间：" >
          <el-date-picker
            v-model="updateTime.actTime"
            :clearable="true"
            :picker-options="pickerDateRange"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
            default-time="23:59:59"
            autocomplete="off"
            class="elInput"/>
        </el-form-item>
        <el-form-item label="备注：" >
          <el-input
            v-model="row_details.remarks"
            type="textarea"
            rows="5"
            autocomplete="off"
            class="elInput"/>
            <!--<el-button type="text" size="small" @click="newRemarksDialog">修改备注</el-button>-->
        </el-form-item>
      </el-form>
      <div slot="footer" style="display:block; margin:0 auto; text-align:center" class="dialog-footer">
        <el-button class="new_submit" @click="changeRemarks">保存</el-button>
        <el-button @click=" dialogTableVisible_Details = false">关闭</el-button>
      </div>
    </el-dialog>

    <!--角色授予-->
    <el-dialog :visible.sync="dialogRoleVisible" title="角色授予">
      <el-form label-width="100px" class="inputTest">
        <el-form-item label="角色授予:">
          <el-select v-model="roleName" multiple placeholder="请选择">
            <el-option
              v-for="role in roleList"
              v-if = "role.name !== 'ADMIN'"
              :label="role.fullName"
              :value="role.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="height: 100px"/>
      <div slot="footer" class="dialog-footer" style="display:block; margin:0 auto; text-align:center">
        <el-button @click="dialogRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRole">确 定</el-button>
      </div>
    </el-dialog>

    <!--          新建用户弹出框-->
    <el-dialog :visible.sync="dialogTableVisible_New" title="新建用户" >
      <el-form :model="new_user" label-width="100px" class="inputTest">
        <el-form-item label="用户全称：" >
          <el-input v-model="new_user.userName" autocomplete="off" class="elInput"/>
        </el-form-item>
        <el-form-item label="登陆账号：" >
          <el-input v-model="new_user.loginName" autocomplete="off" class="elInput"/>
        </el-form-item>
        <el-form-item label="登陆密码：" >
          <el-input v-model="new_user.loginPassword" type="password" autocomplete="off" class="elInput"/>
        </el-form-item>
        <el-form-item label="渠道：" >
          <!--<el-input v-model="new_user.channelId" autocomplete="off" class="elInput"/>-->
          <el-select v-model="new_user.channelId" placeholder="请选择">
            <el-option
              v-for="channel in channelList"
              :label="channel.channelFullName"
              :value="channel.channelId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="角色类型：" >
          <!--<el-input v-model="new_user.roles" autocomplete="off" class="elInput"/>-->
          <el-select v-model="newRoles" multiple placeholder="请选择">
            <el-option
              v-for="role in roleList"
              v-if = "role.name !== 'ADMIN'"
              :label="role.fullName"
              :value="role.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="到期时间：" >
          <el-col :span="12">
            <el-date-picker
              v-model="new_user.actTime"
              :picker-options="pickerDateRange"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              default-time="23:59:59"
              autocomplete="off"
              class="elInput"/>
          </el-col>
          <el-col :span="8">
            <el-tooltip effect="light" content="到期时间不填表示永久账户" placement="right">
              <i class="el-icon-question" style="font-size: 20px" />
            </el-tooltip>
          </el-col>
        </el-form-item>
        <el-form-item label="备注：" >
          <el-input
            v-model="new_user.remarks"
            type="textarea"
            rows="5"
            autocomplete="off"
            class="elInput"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="new_submit" style="display:block;margin:0 auto" @click="newUser">
          <span>确定</span>
        </el-button>
      </div>
    </el-dialog>
  </el-row>

</template>

<script>
import { findModels, newUser, userSearch, userDelete, changePass, changeRemarks, disabledChange, getAllRoleList, changeRole, getAllChannel } from '@/api/userManage/index'
export default {
  filters: {
    timeFormat: function(time) {
      if (time != null) {
        var d = new Date(time)
        var year = d.getFullYear() // 年
        var month = d.getMonth() + 1 // 月
        var day = d.getDate() // 日
        var hh = d.getHours() // 时
        var mm = d.getMinutes() // 分
        var ss = d.getSeconds() // 秒
        var clock = year + '-'
        if (month < 10) { clock += '0' } clock += month + '-'
        if (day < 10) { clock += '0' } clock += day + ' '
        if (hh < 10) { clock += '0' } clock += hh + ':'
        if (mm < 10) clock += '0'
        clock += mm + ':'
        if (ss < 10) clock += '0'
        clock += ss
        return (clock)
      } else {
        return ('')
      }
    }
  },
  components: {
  },

  data() {
    return {
      tableData: [],
      total: 0,
      multipleSelection: [],
      pageStart: 1,
      pageEnd: 10,
      pageSize: 10,
      page: 1,
      curPage: 1,
      nameFlag: '',
      dialogTableVisible_Details: false,
      dialogTableVisible_New: false,
      dialogPasswordVisible: false,
      dialogRemarksVisible: false,
      dialogDisabledVisible: false,
      dialogUpdatTimeVisible: false,
      dialogRoleVisible: false,
      disabledRadio: {
        id: '',
        state: ''
      },
      row_details: {
        id: '',
        userName: '',
        loginPassword: '',
        remarks: '',
        actTime: '',
        roles: ''
      },
      new_user: {
        userName: '',
        loginPassword: '',
        remarks: '',
        loginName: '',
        channelId: '',
        actTime: '',
        roles: []
      },
      listQuery: {
        pageSize: 10,
        page: 1
      },
      newPassword: {
        id: ''
        // loginPassword: '',
        // checkPass: ''
      },
      user_search: {
        userName: '',
        pageSize: 10,
        page: 1
      },
      flag: 1,
      // delectDialog: false,
      delete_user: {
        userName: '',
        id: ''
      },
      delete_message: {},
      newRemarksForm: {
        id: '',
        actTime: '',
        remarks: ''
      },
      updateTime: {
        id: '',
        actTime: ''
      },
      roleList: [],
      roleName: [],
      newRoles: [],
      queryRole: {
        id: '',
        roles: ''
      },
      channelList: [],
      pickerDateRange: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      useState: ''
    }
  },
  created: function() {
    // this.getAllList()
    this.search()
    this.getAllChannel()
    this.getAllRoleList()
  },
  methods: {
    handleClick(row) {
      console.log(row)
      this.row_details.id = row.id
      this.updateTime.id = row.id
      this.newRemarksForm.id = row.id
      this.queryRole.id = row.id
      this.row_details.remarks = row.remarks
      this.row_details.userName = row.userName
      this.row_details.loginPassword = '*******'
      var Role = ''
      for (var i = 0; i < row.roles.length; i++) {
        Role += row.roles[i].fullName + ','
        // this.roleName[i] = row.roles[i].id
      }
      this.row_details.roles = Role.substring(0, Role.length - 1)
      console.log(this.row_details.roles)
      this.row_details.actTime = this.timeFormat(row.deadline)
      this.updateTime.actTime = this.timeFormat(row.deadline)
      // this.new_user.actTime = this.timeFormat(row.actTime)
      this.dialogTableVisible_Details = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    newDialog() {
      this.dialogTableVisible_New = true
    },
    newSubmit() {
      console.log(this.new_user)

      this.dialogTableVisible_New = false
    },
    getAllList: function() {
      this.listQuery.page = this.flag === 2 ? 1 : this.page
      this.listQuery.pageSize = this.pageSize
      this.curPage = this.flag === 2 ? 1 : this.curPage
      this.flag = 1
      // this.listQuery.page = this.page
      findModels(this.listQuery).then(response => {
        console.log(response)
        this.total = response.total
        this.tableData = response.data.items
        this.pageStart = (this.page - 1) * this.pageSize + 1
        this.pageEnd = this.page * this.pageSize
      })
    },
    handleSizeChange: function(val) {
      this.pageSize = val
      // this.flag === 1 ? this.getAllList() : this.search()
      this.search()
    },
    handleCurrentChange: function(val) {
      this.page = val
      // this.flag === 1 ? this.getAllList() : this.search()
      this.search()
    },
    newUser: function() {
      var roles1 = ''
      for (var i = 0; i < this.newRoles.length; i++) {
        roles1 += this.newRoles[i] + '*'
      }
      this.new_user.roles = roles1.substring(0, roles1.length - 1)
      if (this.new_user.userName !== '' && this.new_user.loginName !== '' && this.new_user.loginPassword !== '' && this.new_user.channelId !== '' && this.new_user.roles !== '') {
        newUser(this.new_user).then(response => {
          console.log(response)
          if (response.data.success) {
            this.$message({
              showClose: true,
              message: '用户创建成功!',
              type: 'success'
            })
            // this.getUserList()
            this.getAllList()
            this.dialogTableVisible_New = false
          } else if (response.msg === '创建失败，该登录账号已存在') {
            this.$message({
              showClose: true,
              message: '用户创建失败，该登录账号已存在!',
              type: 'error',
              duration: 6000
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: '请完整填写用户信息!',
          type: 'warning'
        })
      }
    },
    search: function() {
      // this.user_search.page = this.flag === 1 ? 1 : this.page
      // this.user_search.pageSize = this.pageSize
      // this.curPage = (this.flag === 1 | this.nameFlag !== this.user_search.userName) ? 1 : this.curPage
      // this.flag = 2
      // this.nameFlag = this.user_search.userName
      this.curPage = (this.nameFlag !== this.user_search.userName) ? 1 : this.curPage
      this.page = (this.nameFlag !== this.user_search.userName) ? 1 : this.page
      this.user_search.page = this.page
      this.user_search.pageSize = this.pageSize
      userSearch(this.user_search).then(response => {
        console.log(response)
        this.tableData = response.data.items
        this.total = response.data.total
        this.pageStart = (this.user_search.page - 1) * this.user_search.pageSize + 1
        this.pageEnd = this.user_search.page * this.user_search.pageSize
      })
      this.nameFlag = this.user_search.userName
    },
    stop_Dialog: function(row) {
      this.disabledRadio.id = row.id
      // this.disabledRadio.state = row.useState
      // this.dialogDisabledVisible = true

      this.$confirm('该用户当前状态为' + (row.useState === '1' ? '启用' : row.useState === '2' ? '停用' : '冻结') + '状态, 是否' + (row.useState === '1' ? '停用' : row.useState === '2' ? '启用' : '恢复') + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.disabledRadio.state = row.useState === '1' ? '2' : '1'
        disabledChange(this.disabledRadio).then(response => {
          if (response.data.success) {
            this.getAllList()
            this.$message({
              showClose: true,
              message: '修改成功!',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '修改失败!',
              type: 'warning'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改！'
        })
      })
    },
    userDelect: function() {
      userDelete(this.delete_user).then(response => {
        console.log(response)
        if (response.data.success) {
          this.$message({
            showClose: true,
            message: '用户删除成功!',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '用户删除失败!',
            type: 'warning'
          })
        }
        // this.getUserList()
        this.getAllList()
        this.delectDialog = false
      })
    },
    changePSW: function() {
      this.$confirm('是否重置密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.newPassword.id = this.row_details.id
        changePass(this.newPassword).then(response => {
          console.log(response)
          if (response.data.success) {
            this.$message({
              showClose: true,
              message: '重置成功!',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '修改失败!',
              type: 'warning'
            })
          }
          this.dialogTableVisible_Details = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置！'
        })
      })
    },
    changeRemarks: function() {
      this.newRemarksForm.id = this.row_details.id
      this.newRemarksForm.actTime = (this.updateTime.actTime === null ? '' : this.updateTime.actTime)
      this.newRemarksForm.remarks = (this.row_details.remarks === null ? '' : this.row_details.remarks)
      console.log(this.updateTime.actTime)
      console.log(this.newRemarksForm)
      changeRemarks(this.newRemarksForm).then(response => {
        console.log(response)
        if (response.data.success) {
          this.getAllList()
          this.$message({
            showClose: true,
            message: '修改成功!',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '修改失败!',
            type: 'warning'
          })
        }
      })
      // this.dialogRemarksVisible = false
      this.dialogTableVisible_Details = false
    },
    timeFormat: function(time) {
      if (time === '' || time === null) {
        return ('')
      } else {
        var d = new Date(time)
        var year = d.getFullYear() // 年
        var month = d.getMonth() + 1 // 月
        var day = d.getDate() // 日
        var hh = d.getHours() // 时
        var mm = d.getMinutes() // 分
        var ss = d.getSeconds() // 秒
        var clock = year + '-'
        if (month < 10) { clock += '0' } clock += month + '-'
        if (day < 10) { clock += '0' } clock += day + ' '
        if (hh < 10) { clock += '0' } clock += hh + ':'
        if (mm < 10) clock += '0'
        clock += mm + ':'
        if (ss < 10) clock += '0'
        clock += ss
        return (clock)
      }
    },
    // 获取所有的角色
    getAllRoleList: function() {
      this.roleName = this.row_details.roles
      getAllRoleList().then(response => {
        console.log(response)
        this.roleList = response.data.items
      })
    },
    // 角色授予
    changeRole: function() {
      var roles1 = ''
      for (var i = 0; i < this.roleName.length; i++) {
        roles1 += this.roleName[i] + '*'
      }
      this.queryRole.roles = roles1.substring(0, roles1.length - 1)
      console.log(this.queryRole)
      changeRole(this.queryRole).then(response => {
        console.log(response)
        if (response.data.success) {
          this.$message({
            showClose: true,
            message: '修改成功!',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '修改失败!',
            type: 'warning'
          })
        }
      })
      this.dialogRoleVisible = false
      this.dialogTableVisible_Details = false
    },
    // 获取所有渠道信息
    getAllChannel: function() {
      getAllChannel().then(response => {
        console.log(response)
        this.channelList = response.data.items
      })
    }
  }
}
</script>
<style>
  .elInput{
    width: 80%;
  }
  .elBtn{
    background-color: #C23232;
    color: white;
  }
</style>
