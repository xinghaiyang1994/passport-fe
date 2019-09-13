<template>
  <div class="curd">
    <!-- 筛选 -->
    <div ref="query" class="curd-head clearfix">
      <div class="fl">
        <div class="clearfix">
          <div class="fl mr-30">
            <div class="clearfix">
              <div class="curd-fl-left fl">
                <span class="curd-must">*</span>应用名称
              </div>
              <div class="fl">
                <el-input @input="chgQueryField" v-model="query.name" size="small"></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="curd-head-right fr clearfix">
        <el-button @click="resetQuery" size="small">重置</el-button>
        <el-button @click="openAdd" size="small" type="primary">新增</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <div>
      <el-table
        :data="list"
        v-loading="loading"
        border
        class="mb-30">
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="应用名称"
          align="center">
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          width="180">
          <template slot-scope="scope">
            {{scope.row.gmtCreate | tranTime('timestamp-mysql')}}
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          width="180">
          <template slot-scope="scope">
            {{scope.row.gmtModified | tranTime('timestamp-mysql')}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button class="hh-table-btn" @click="openModify(scope.row)" type="text" size="small">修改</el-button>
            <el-button class="hh-table-btn" @click="deleteItem(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="ta-c">
        <el-pagination
          @size-change="mixinSizeChange"
          @current-change="mixinCurrentChange"
          :current-page="mixinPage.currentPage"
          :page-sizes="mixinPage.pageSizes"
          :page-size="mixinPage.pageSize"
          :layout="mixinPage.layout"
          :total="mixinPage.total">
        </el-pagination>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog width="80%" :title="isModify ? '编辑' : '新增'" :visible.sync="dialogVisible">
      <el-form ref="dialogForm" :model="dialogForm" label-width="120px" size="small">
        <el-form-item label="应用名称" prop="name" :rules="checkLimitWord(20, true)">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="validateDialogForm" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import { Mixins, Component, Vue } from 'vue-property-decorator'
  import Pagination from '../../mixins/pagination'
  import { debounce, valueByKey } from '../../utils/tools'
  import { checkLimitWord } from '../../utils/check'
  import {
    postDeletetItem,
    postModifyItem,
    getDetailItem
  } from '../../api/mock'
  import {
    getAppList,
    postAppAdd,
  } from '../../api/actions'
  
  interface Query {
    name: string
  }
  interface DialogForm {
    id?: number,
    name: string
  }

  let query = {
    name: ''
  }
  let dialogForm = {
    name: ''
  }

  @Component
  export default class AppList extends Mixins(Pagination) {
    // data
    loading: boolean = true
    query: Query = JSON.parse(JSON.stringify(query))
    list: Array<any> = []
    getListDebounce = debounce(this.getList, 300)
    isModify: boolean = false
    dialogVisible: boolean = false
    dialogForm: DialogForm = JSON.parse(JSON.stringify(dialogForm))
    
    // methods
    checkLimitWord = checkLimitWord
    valueByKey = valueByKey
    // 单个字段防抖筛选
    chgQueryField() {
      this.getListDebounce()
    }
    // 重置筛选
    resetQuery() {
      this.query = JSON.parse(JSON.stringify(query))
      this.mixinPage.currentPage = 1
      this.getList()
    }
    dealQueryData() {
      let query = JSON.parse(JSON.stringify(this.query))
      let page = JSON.parse(JSON.stringify(this.mixinPage))
      return {
        name: query.name,
        type: query.type,
        page: page.currentPage,
        pageSize: page.pageSize
      }
    }
    getList() {
      let data = this.dealQueryData()
      console.log('筛选条件', data)
      this.loading = true
      getAppList(data).then(res => {
        console.log(res)
        let resData = res.data
        this.list = resData.list
        this.mixinPage.total = resData.total
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }
    // 删除单个
    deleteItem(item: DialogForm) {
      this.$confirm('是否删除该项？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postDeletetItem({
          id: item.id
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {})
    }
    // 打开新增
    openAdd() {
      this.dialogForm = JSON.parse(JSON.stringify(dialogForm))
      this.isModify = false
      this.dialogVisible = true
      this.$nextTick(() => {
        let oDialogForm: any = this.$refs['dialogForm']
        oDialogForm.clearValidate()
      })
    }
    // 打开编辑
    openModify(item: DialogForm) {
      getDetailItem({
        id: item.id
      }).then(res => {
        console.log(res)
        let resData = res.data
        this.dialogForm = {
          id: resData.id,
          name: resData.name
        }
        this.isModify = true
        this.dialogVisible = true
        this.$nextTick(() => {
          let oDialogForm: any = this.$refs['dialogForm']
          oDialogForm.clearValidate()
        })
      }).catch(() => {})
    }
    // 弹窗表单校验
    validateDialogForm() {
      let oDialogForm: any = this.$refs['dialogForm']
      oDialogForm.clearValidate()
      oDialogForm.validate((valid: any) => {
        if (valid) {
          if (this.isModify) {
            this.modifyItem()
          } else {
            this.addItem()
          }
        }
      })
    }
    tranDialogData(type: string) {
      let form = JSON.parse(JSON.stringify(this.dialogForm))
      let data = form
      if (type === 'modify') {
        data.id = form.id
      } else {
        delete data.id
      }
      return data
    }
    // 新增
    addItem() {
      let data = this.tranDialogData('add')
      postAppAdd(data).then(res => {
        console.log(res)
        this.dialogVisible = false
        this.getList()
        this.$message({
          message: '新增成功',
          type: 'success'
        })
      }).catch(() => {})
    }
    // 修改
    modifyItem() {
      let data = this.tranDialogData('modify')
      postModifyItem(data).then(res => {
        console.log(res)
        this.dialogVisible = false
        this.getList()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }).catch(() => {})
    }

    // 生命周期
    created() {
      this.getList()
    }
  }
</script>