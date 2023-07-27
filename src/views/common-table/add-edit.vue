<template>
  <hs-layout-detail>
    <hs-breadcrumb
      slot="page-breadcrumb"
      :list="breadcrumbList"
      :goBack="cancelClick"
    />
    <el-form
      :inline="true"
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
            :clearable="false"
            :editable="false"
            v-model="formData.year"
            type="year"
            value-format="yyyy"
            format="yyyy年"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单位" prop="companyId">
          <select-company
            v-model="formData.companyId"
            clearable
            @change="companyIdChange"
          />
        </el-form-item>
        <el-form-item label="部门" prop="departmentId">
          <select-department
            ref="departmentRef"
            v-model="formData.departmentId"
            clearable
          />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="formData.name"
            clearable
            maxlength="50"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="考核结果" prop="examineDictCode">
          <select-dict-list
            useCode
            v-model="formData.examineDictCode"
            clearable
            dictCode="assessment-results"
          />
        </el-form-item>
      </el-card>
    </el-form>
    <div class="footer-btn">
      <el-button type="plain" @click="cancelClick">取消</el-button>
      <el-button type="primary" @click="submitClick" v-loading="loading">
        提交
      </el-button>
    </div>
  </hs-layout-detail>
</template>
<script>
import {
  yearExamineInsert,
  yearExamineUpdate,
  getCompanyInfoById,
} from '@/apis/xbase-dev'
export default {
  name: 'annual-assessment-add-edit',
  data() {
    return {
      spanCol: 24,
      loading: false,
      tableId: '',
      breadcrumbList: ['年度考核', this.$route.query.id ? '编辑' : '新增'],
      formData: {
        year: '',
        companyId: '',
        departmentId: '',
        name: '',
        examineDictCode: '',
      },
      rules: {
        year: [{ required: true, message: '年度必填' }],
        companyId: [{ required: true, message: '单位必填' }],
        departmentId: [{ required: true, message: '部门必填' }],
        name: [{ required: true, message: '姓名必填' }],
        examineDictCode: [{ required: true, message: '考核结果必填' }],
      },
    }
  },
  mounted() {
    this.tableId = this.$route.query.id
    this.tableId && this.getInfo()
  },
  methods: {
    companyIdChange(val) {
      this.$refs.departmentRef.getData(val ? val : '')
    },
    // 获取详情
    async getInfo() {
      const data = await getCompanyInfoById({ id: this.tableId })
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
            await yearExamineUpdate(params)
            this.$message.success('编辑成功')
          } else {
            await yearExamineInsert(params)
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
        name: 'annualAssessment',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.common-margin-top-12 {
  margin-top: 12px;
}
.footer-btn {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
::v-deep .el-form-item__content {
  width: 400px !important;
  .el-select,
  .el-cascader,
  .el-input__inner {
    max-width: 300px !important;
  }
}
</style>
