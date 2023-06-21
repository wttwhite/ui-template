<template>
  <el-dialog title="修改考勤状态" :visible.sync="dialogVisible" width="650px">
    <el-form ref="formRef" :model="formData" label-width="120px">
      <el-form-item label="考勤状态">
        <el-select v-model="formData.dayType">
          <el-option
            v-for="(val, key, index) in daysTypeMap"
            :key="index"
            :label="val"
            :value="key"
          >
          </el-option
        ></el-select>
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
        dayType: '',
        dayProp: '',
      },
      loading: false,
      // ×☆○△√/
      daysTypeMap: {
        '×': '旷工',
        '☆': '加班',
        '○': '请假',
        '△': '迟到早退',
        '√': '正常上班',
        '/': '双休、节假日',
      },
    }
  },
  methods: {
    showDialog(row, item) {
      this.dialogVisible = true
      this.formData = {
        ...this.formData,
        id: row.id,
      }
      this.$set(this.formData, 'dayType', row[item.prop])
      // 缓存修改的prop
      this.$set(this.formData, 'dayProp', item.prop)
    },
    saveClick() {
      this.$refs['formRef'].validate(async (valid) => {
        if (!valid || this.loading) return
        this.loading = true
        try {
          const { dayType, id, dayProp } = this.formData
          let params = {
            id,
          }
          params[dayProp] = dayType
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
