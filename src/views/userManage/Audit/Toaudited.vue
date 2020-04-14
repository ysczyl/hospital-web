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
      </el-form>
    </div>

    <!-- 表格 -->
    <div style="margin-top: 15px;margin-right: 1%">
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        border
        align="center"
        @selection-change="handleSelectionChange">
        <el-table-column prop="idCard" label="身份证" :show-overflow-tooltip="true" min-width="20%" align="center">
          <template slot-scope="scope">{{ scope.row.idCard }}</template>
        </el-table-column>
        <el-table-column prop="authorizeCode" label="授权码" :show-overflow-tooltip="true" min-width="20%" align="center">
          <template slot-scope="scope">{{ scope.row.authorizeCode }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" :show-overflow-tooltip="true" min-width="16%" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column prop="queryName" label="发起人" :show-overflow-tooltip="true" min-width="12%" align="center">
          <template slot-scope="scope">{{ scope.row.queryName }}</template>
        </el-table-column>
        <el-table-column prop="queryTime" label="发起时间" :show-overflow-tooltip="true" min-width="12%" align="center">
          <template slot-scope="scope">{{ scope.row.queryTime }}</template>
        </el-table-column>
        <el-table-column prop="state" label="审核状态" :show-overflow-tooltip="true" min-width="12%" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state === '3'" style="color: green">审核通过</span>
            <span v-else-if="scope.row.state === '4'" style="color: red">审核不通过</span>
          </template>
        </el-table-column>
      </el-table>
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
import { queryformin } from '../../../api/userManage/audit'
export default {
  name: 'Toaudited',
  data() {
    return {
      pages: '1', // 当前页数
      totalsize: 0, // 信息总条数

      /** 查询*/
      formInline: {
        idCard: '',
        authorizeCode: '',
        pages: '1',
        state: '1'
      },
      /** 表格*/
      tableData: [],
    }
  },
  created: function () {
    this.queryform()
  },
  methods: {
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
      this.formInline.pages = val.valueOf()
      queryformin(this.formInline).then(response => {
        console.log(response)
        this.tableData = response.data
        this.totalsize = response.total
      })
    },
  }
}
</script>

<style scoped>

</style>

