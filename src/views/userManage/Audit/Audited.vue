<template>
  <div>
    <!--查询表单-->
    <div style="margin-top: 20px" >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="授权码">
          <el-input v-model="formInline.authorizeCode" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="formInline.idCard" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryform('formInline')">查询</el-button>
        </el-form-item>
        <el-button type="primary" style="margin-left: 40%" @click="onbatchagreejudgment()">批量通过</el-button>
        <el-button type="danger" @click="onbatchdisagreejudgment()">批量不通过</el-button>
      </el-form>
    </div>
    <!-- 表格 -->
    <div style="margin-top: 15px;margin-right: 1%">
      <el-table
        :data="tableData"
        ref="multipleTable"
        border
        align="center"
        :row-class-name="rowClassName"
        @selection-change="handleSelectionChange">
        <el-table-column label="选择" type="selection" :show-overflow-tooltip="true" min-width="10%" align="center">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证" :show-overflow-tooltip="true" min-width="16%" align="center">
          <template slot-scope="scope">{{ scope.row.idCard }}</template>
        </el-table-column>
        <el-table-column prop="authorizeCode" label="授权码" :show-overflow-tooltip="true" min-width="15%" align="center">
          <template slot-scope="scope">{{ scope.row.authorizeCode }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" :show-overflow-tooltip="true" min-width="15%" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column prop="queryName" label="发起人" :show-overflow-tooltip="true" min-width="10%" align="center">
          <template slot-scope="scope">{{ scope.row.queryName }}</template>
        </el-table-column>
        <el-table-column prop="queryTime" label="发起时间" :show-overflow-tooltip="true" min-width="12%" align="center">
          <template slot-scope="scope">{{ scope.row.queryTime }}</template>
        </el-table-column>
        <el-table-column prop="state" label="审核状态" :show-overflow-tooltip="true" min-width="8%" align="center">
          <template slot-scope="scope">
            <span>审核中</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="审核操作" :show-overflow-tooltip="true" min-width="14%" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary"  @click="onagreejudgment(scope.row.id,scope.row.state)">通过</el-button>
            <el-button size="mini" type="danger" @click="ondisagreejudgment(scope.row.id,scope.row.state)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 信息弹框 通过-->
    <div v-if="dialogVisibleagree">
      <el-dialog
        :visible.sync="dialogVisibleagree"
        :close-on-click-modal="false"
        :before-close="handleClose"
        :show-close="false"
        style="text-align: left"
        width="40%"
        top="25vh">
        <!--标题-->
        <div slot="title" class="header-title" style="font-size: medium;height: 40px">
          <span class="title-age">备注</span>
        </div>
        <!--内容-->
        <el-form :model="formdetails" style="margin-top: -40px">
          <div align="center">
            <el-form-item :label-width="formLabelWidth">
                <el-input v-model="formdetails.Remarks" :rows="10" type="textarea" placeholder="同意" style="width: 100%"/>
            </el-form-item>
          </div>
          <!--底部-->
          <div style="text-align: center">
            <!-- 单个通过 -->
            <span v-if="Selection.num === 1" slot="footer" class="dialog-footer">
              <template>
                <el-button style="margin-right: 40px" @click="alertagree = true">确 定</el-button>
                <el-button type="primary" @click="offagreejudgment()">取 消</el-button>
              </template>
            </span>
            <!-- 批量通过 -->
            <span v-else slot="footer" class="dialog-footer">
              <template>
                <el-button style="margin-right: 40px" @click="alertagree = true">确 定</el-button>
                <el-button type="primary" @click="dialogVisibleagree = false">取 消</el-button>
              </template>
            </span>
          </div>
        </el-form>
      </el-dialog>
    </div>

    <!-- 信息弹框 不通过-->
    <div v-if="dialogVisibledisagree">
      <el-dialog
        :visible.sync="dialogVisibledisagree"
        :close-on-click-modal="false"
        :before-close="handleClose"
        :show-close="false"
        style="text-align: left"
        width="40%"
        top="25vh">
        <!--标题-->
        <div slot="title" class="header-title" style="font-size: medium;height: 40px">
          <span class="title-age">备注</span>
        </div>
        <!--内容-->
        <el-form :model="formdetails" style="margin-top: -40px">
          <div align="center">
            <el-form-item :label-width="formLabelWidth">
              <el-input v-model="formdetails.Remarks" :rows="10" type="textarea" placeholder="请输入不通过原因" style="width: 100%"/>
            </el-form-item>
          </div>
          <!--底部-->
          <div style="text-align: center">
            <!-- 单个不通过 -->
            <span v-if="Selection.num === 1" slot="footer" class="dialog-footer">
              <template>
                <el-button style="margin-right: 40px" @click="alertdisagree = true">确 定</el-button>
                <el-button type="primary" @click="offdisagreejudgment()">取 消</el-button>
              </template>
            </span>
            <!-- 批量不通过 -->
            <span v-else slot="footer" class="dialog-footer">
              <template>
                <el-button style="margin-right: 40px" @click="alertdisagree = true">确 定</el-button>
                <el-button type="primary" @click="dialogVisibledisagree = false">取 消</el-button>
              </template>
            </span>
          </div>
        </el-form>
      </el-dialog>
    </div>

    <!--确认弹框通过-->
    <div>
      <el-dialog :visible.sync="alertagree" :show-close="false" :close-on-click-modal="false" :before-close="handleClose" width="25%" style="text-align: left" top= "45vh">
        <!--标题-->
        <div slot="title" style="font-size: large">
          <span class="title-age">提示</span>
        </div>
        <!--内容-->
        <div style="margin-top: -20px;margin-left: 5%;font-size: medium">
          <span><i class="el-icon-warning"/>是否通过审核?</span>
        </div>
        <!--底部-->
        <div style="margin-right: 5%;text-align: right;margin-top: 10px">
          <!-- 单个通过 -->
          <span v-if="Selection.num === 1" slot="footer" class="dialog-footer">
            <el-button size="small" @click="agree()">确定</el-button>
            <el-button type="primary" size="small" @click="alertagree = false">取消</el-button>
          </span>
          <!-- 批量通过 -->
          <span v-else slot="footer" class="dialog-footer">
            <el-button size="small" @click="batchagree()">确定</el-button>
            <el-button type="primary" size="small" @click="alertagree = false">取消</el-button>
          </span>
        </div>
      </el-dialog>
    </div>

    <!--确认弹框不通过-->
    <div>
      <el-dialog :visible.sync="alertdisagree" :show-close="false" :close-on-click-modal="false" :before-close="handleClose" width="25%" style="text-align: left" top= "45vh">
        <!--标题-->
        <div slot="title" style="font-size: large">
          <span class="title-age">提示</span>
        </div>
        <!--内容-->
        <div style="margin-top: -20px;margin-left: 5%;font-size: medium">
          <span><i class="el-icon-warning"/>是否不通过审核?</span>
        </div>
        <!--底部-->
        <div style="margin-right: 5%;text-align: right;margin-top: 10px">
          <!-- 单个不通过 -->
          <span v-if="Selection.num === 1" slot="footer" class="dialog-footer">
            <el-button size="small" @click="disagree()">确定</el-button>
            <el-button type="primary" size="small" @click="alertdisagree = false">取消</el-button>
          </span>
          <!-- 批量不通过 -->
          <span v-else slot="footer" class="dialog-footer">
            <el-button size="small" @click="batchdisagree()">确定</el-button>
            <el-button type="primary" size="small" @click="alertdisagree = false">取消</el-button>
          </span>
        </div>
      </el-dialog>
    </div>

    <!--分页-->
    <div align="center" style="margin-top: 30px;" aria-multiline="true">
      <el-pagination
        :current-page="formInline.pages"
        :page-sizes="[10]"
        :page-size="10"
        :total="totalsize"
        layout="total,  prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { auditagree, queryformin } from '../../../api/userManage/audit'
  export default {
    name: 'Audited',
    data() {
      return {
        pages: 1, // 当前页数
        totalsize: 20, // 信息总条数
        dialogVisibleagree: false, // 通过弹框
        dialogVisibledisagree: false, //不通过弹框
        alertagree: false, // 确认弹框通过
        alertdisagree: false, //确认弹框不通过
        /** 合同查询*/
        formInline: {
          idCard: '',
          authorizeCode: '',
          pages: '1',
          state: '3'
        },
        /** 表格*/
        tableData: [],
        /** 备注信息*/
        formdetails:{
          Remarks: ''
        },
        multipleSelection: [], // 多选
        Selection:{ num: 0 }, // 单选
        tableDatad:{
          id: 0,
          state: '',
          remarks: ''
        } // 单选表单
      }
    },
    created: function () {
      this.queryform()
    },
    methods: {
      rowClassName({row, rowIndex}) {
        //把每一行的索引放进row.id
        row.idrow = rowIndex;
      },

      /** 多选 */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /**  单审判断*/
      onagreejudgment: function(Id, Status) {
        this.tableDatad.id = Id
        this.tableDatad.state = '3'
        console.log(this.tableDatad)
        this.Selection.num = 1
        this.dialogVisibleagree = true
      },
      ondisagreejudgment: function(Id, Status) {
        this.tableDatad.id = Id
        this.tableDatad.state = '4'
        console.log(this.tableDatad)
        this.Selection.num = 1
        this.dialogVisibledisagree = true
      },
      offagreejudgment: function() {
        this.dialogVisibleagree = false
        this.Selection.num = 0
        this.$refs['tableDatad'].resetFields()
      },
      offdisagreejudgment: function() {
        this.dialogVisibledisagree = false
        this.Selection.num = 0
        this.$refs['tableDatad'].resetFields()
      },
      /**  多审判断*/
      onbatchagreejudgment: function() {
        if (this.multipleSelection.length > 0) {
          this.dialogVisibleagree = true
        }
      },
      onbatchdisagreejudgment: function() {
        if (this.multipleSelection.length > 0) {
          this.dialogVisibledisagree = true
        }
      },

      /** 查询*/
      queryform: function(Formname) {
        queryformin(this.formInline).then(response => {
          console.log(response)
          this.tableData = response.data
          this.totalsize = response.total
        })
      },

      /** 分页*/
      handleCurrentChange: function(val) {
        console.log(`当前页: ${val}`)
        this.formInline.pages = val
        queryformin(this.formInline).then(response => {
          console.log(response)
          this.tableData = response.data
          this.totalsize = response.total
        })
      },

      /**  单通过*/
      agree: function() {
        if (this.formdetails.Remarks == ''){
          this.formdetails.Remarks = '同意'
        }
        this.tableDatad.remarks = this.formdetails.Remarks
        console.log(this.tableDatad)
        auditagree(this.tableDatad).then(response => {
          queryformin(this.formInline).then(response => {
            console.log(response)
            this.tableData = response.data
            this.totalsize = response.total
          })
        })

        this.alertagree = false
        this.dialogVisibleagree = false
        this.Selection.num = 0
        this.formdetails.Remarks = ''
      },
      /** 单不通过*/
      disagree: function() {
        if (this.formdetails.Remarks == ''){
          this.formdetails.Remarks = '不同意'
        }
        this.tableDatad.remarks = this.formdetails.Remarks
        console.log(this.tableDatad)
        auditagree(this.tableDatad).then(response => {
          queryformin(this.formInline).then(response => {
            console.log(response)
            this.tableData = response.data
            this.totalsize = response.total
          })
        })
        this.alertdisagree = false
        this.dialogVisibledisagree = false
        this.Selection.num = 0
        this.formdetails.Remarks = ''
      },
      /** 批量通过*/
      batchagree: function() {
        console.log(this.multipleSelection)
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.tableDatad.id = this.multipleSelection[i].id
          this.tableDatad.state = '3'
          if (this.formdetails.Remarks == ''){
            this.formdetails.Remarks = '同意'
          }
          this.tableDatad.remarks = this.formdetails.Remarks
          auditagree(this.tableDatad).then(response => {
            queryformin(this.formInline).then(response => {
              console.log(response)
              this.tableData = response.data
              this.totalsize = response.total
            })
          })
        }
        this.alertagree = false
        this.dialogVisibleagree = false
        this.$refs.multipleTable.clearSelection();
        this.formdetails.Remarks = ''
      },
      /** 批量不通过*/
      batchdisagree: function() {
        console.log(this.multipleSelection)
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.tableDatad.id = this.multipleSelection[i].id
          this.tableDatad.state = '4'
          if (this.formdetails.Remarks == ''){
            this.formdetails.Remarks = '不同意'
          }
          this.tableDatad.remarks = this.formdetails.Remarks
          auditagree(this.tableDatad).then(response => {
            queryformin(this.formInline).then(response => {
              console.log(response)
              this.tableData = response.data
              this.totalsize = response.total
            })
          })
        }
        this.alertdisagree = false
        this.dialogVisibledisagree = false
        this.$refs.multipleTable.clearSelection();
        this.formdetails.Remarks = ''
      },
    }
  }
</script>

<style scoped>

</style>
