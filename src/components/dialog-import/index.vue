<template>
  <el-dialog title="考勤导入" :visible.sync="dialogVisible" width="650px">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="下载模板">
        <el-button type="primary" @click="exportClick">下载考勤模板</el-button>
      </el-form-item>
      <el-form-item label="导入">
        <upload-single-file
          ref="UploadFile"
          descUnder="提示：请确认提交月份，重复年月数据将更新为最新提交数据"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveClick" v-loading="loading">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { downloadFile } from 'hsja-utils'
import { exportExcelModel, importExcel } from '@/apis/nhctkqgl'
export default {
  name: 'dialog-import',
  data() {
    return {
      dialogVisible: false,
      formData: {
        fileId: [],
      },
      rules: {
        fileId: [{ reuqired: true, message: ' ' }],
      },
      loading: false,
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.UploadFile.clearUpload()
      })
    },
    async exportClick() {
      const res = await exportExcelModel(this.searchForm)
      downloadFile(res)
    },
    async saveClick() {
      if (this.loading) return
      this.loading = true
      try {
        await this.$refs.UploadFile.submitFile(importExcel)
        this.loading = false
        this.$message.success('导入成功')
        this.dialogVisible = false
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  min-height: 300px;
}
</style>
