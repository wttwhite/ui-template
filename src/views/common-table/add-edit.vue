<template>
  <hs-layout-detail footerBtn>
    <hs-breadcrumb
      slot="page-breadcrumb"
      :list="breadcrumbList"
      :goBack="cancelClick"
    />
    <el-form
      class="form-box"
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-position="right"
      label-width="200px"
    >
      <el-card>
        <div slot="header">
          <span>基本信息</span>
        </div>
        <el-form-item label="年度" prop="year">
          <el-date-picker
            style="width: 100%"
            v-model="formData.year"
            type="year"
            value-format="yyyy"
            format="yyyy年"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="formData.name"
            clearable
            maxlength="50"
            placeholder="请输入"
          />
        </el-form-item>
      </el-card>
    </el-form>
    <div slot="footer">
      <el-button type="plain" @click="cancelClick">取消</el-button>
      <el-button type="primary" @click="submitClick" v-loading="loading">
        提交
      </el-button>
    </div>
  </hs-layout-detail>
</template>
<script>
import { addApi, updateApi, getDetailApi } from '@/apis/demo-table'
export default {
  name: 'demo-table-add-edit',
  data() {
    return {
      spanCol: 24,
      loading: false,
      tableId: '',
      breadcrumbList: ['年度考核', this.$route.query.id ? '编辑' : '新增'],
      formData: {
        year: '',
        name: '',
      },
      rules: {
        year: [{ required: true, message: '年度必填' }],
        name: [{ required: true, message: '姓名必填' }],
      },
    }
  },
  mounted() {
    this.tableId = this.$route.query.id
    this.tableId && this.getInfo()
  },
  methods: {
    // 获取详情
    async getInfo() {
      const data = await getDetailApi({ id: this.tableId })
      if (data) {
        this.formData = {
          ...data,
        }
      }
    },
    submitClick() {
      console.log('this.formData', this.formData)
      this.$refs['formRef'].validate(async (valid) => {
        if (!valid || this.loading) return
        const params = { ...this.formData }
        this.loading = true
        try {
          if (this.tableId) {
            await updateApi(params)
            this.$message.success('编辑成功')
          } else {
            await addApi(params)
            this.$message.success('新增成功')
          }
          this.loading = false
          this.cancelClick()
        } catch (error) {
          this.loading = false
        }
      })
    },
    cancelClick() {
      this.$router.replace({
        name: 'commonTable',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.form-box {
  ::v-deep .el-form-item__content {
    max-width: 600px;
  }
}
</style>
