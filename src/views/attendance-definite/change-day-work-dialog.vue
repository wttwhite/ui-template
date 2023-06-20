<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
    <el-form ref="formRef" :model="formData" label-width="120px">
      <el-form-item label="加班天数" prop="dayNum">
        <el-input-number
          v-model="formData.dayNum"
          :max="31"
          :min="0"
          :step="0.5"
          step-strictly
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
import { updateCheckOnWork } from '@/apis/nhctkqgl'
export default {
  name: 'change-day-type-dialog',
  data() {
    return {
      dialogVisible: false,
      formData: {
        dayNum: '',
      },
      loading: false,
      dialogTitle: '',
    }
  },
  methods: {
    showDialog(row, key) {
      this.dialogVisible = true
      if (key === 'holidayWorkDays') {
        this.dialogTitle = '修改法定节假日加班天数'
      }
      if (key === 'weekendWorkDays') {
        this.dialogTitle = '修改双休日加班天数'
      }
      console.log('row[key]', row[key])
      this.formData = {
        dayNum: row[key] ? parseFloat(row[key]) : '',
        id: row.id,
        key,
      }
    },
    saveClick() {
      this.$refs['formRef'].validate(async (valid) => {
        if (!valid || this.loading) return
        this.loading = true
        try {
          const { dayNum, id, key } = this.formData
          let params = {
            id,
          }
          params[key] = dayNum
          await updateCheckOnWork(params)
          this.loading = false
          this.$message.success('修改成功')
          this.dialogVisible = false
          this.$emit('update')
        } catch (error) {
          this.loading = false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
