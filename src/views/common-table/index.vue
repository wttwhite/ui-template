<template>
  <hs-layout>
    <hs-breadcrumb slot="page-breadcrumb" :list="breadcrumbList" />
    <el-form
      slot="search"
      :inline="true"
      :model="searchForm"
      ref="searchFormRef"
      label-width="90px"
      @submit.prevent
    >
      <el-form-item label="姓名">
        <el-input
          v-model="searchForm.name"
          clearable
          maxlength="50"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="异常状态">
        <el-select v-model="searchForm.abnormalType" clearable>
          <el-option
            v-for="(item, index) in AbnormalStateList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年月">
        <el-date-picker
          :clearable="false"
          :editable="false"
          v-model="searchForm.date"
          type="month"
          value-format="yyyy-MM"
          format="yyyy年MM月"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="common-search-btn-box">
        <el-button type="primary" icon="el-icon-search" @click="getDataList(1)">
          查询
        </el-button>
        <el-button
          plain
          @click="mixinResetDataList(DefaultSearchForm)"
          icon="el-icon-refresh"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <section slot="btnBox">
      <el-button
        type="primary"
        @click="importClick"
        :disabled="!searchForm.date"
      >
        导入
      </el-button>
      <el-button @click="exportClick">导出</el-button>
    </section>
    <el-table
      :data="pageData"
      height="100%"
      stripe
      ref="tableRef"
      :header-cell-style="$HeaderCellStyle"
    >
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="companyName" label="单位" />
      <el-table-column prop="departmentName" label="部门" />
      <el-table-column prop="stationName" label="岗位" />
      <el-table-column prop="date" label="年月" />
      <el-table-column prop="actualAttendanceDays" label="实际出勤次数" />
      <el-table-column prop="abnormalDays" label="异常天数" />
      <el-table-column prop="absenteeismDays" label="旷工天数" />
      <el-table-column prop="askForLeaveDays" label="请假天数" />
    </el-table>
    <!-- <dialog-import ref="dialogImport" /> -->
    <hs-pagination
      slot="footer"
      @refresh="getDataList"
      :page-no.sync="searchForm.pageNo"
      :page-size.sync="searchForm.pageSize"
      :total="pageTotal"
    />
  </hs-layout>
</template>

<script>
import { getPageDataApi, exportExcel } from '@/apis/index'
// import dayjs from 'dayjs'
const DefaultSearchForm = () => {
  return {
    pageNo: 1,
    pageSize: 10,
    companyId: '',
    departmentId: '',
    name: '',
    stationId: '',
    // date: dayjs(new Date()).format('YYYY-MM'),
    abnormalType: '',
  }
}
export default {
  name: 'common-table',
  data() {
    return {
      breadcrumbList: ['普通表格页面'],
      pageTotal: 0,
      pageData: [],
      searchForm: DefaultSearchForm(),
      DefaultSearchForm: Object.freeze(DefaultSearchForm()),
    }
  },
  created() {
    this.getDataList(1)
  },
  methods: {
    importClick() {
      this.$refs.dialogImport.showDialog()
    },
    async exportClick() {
      const res = await exportExcel({
        ...this.searchForm,
        // date: dayjs(this.searchForm.date).format('YYYY年MM月'),
      })
      // downloadFile(res)
    },
    detailClick(row) {
      this.mixinRouterReplace('attendanceDefinite', {
        // 地址栏上写明userId怪怪的，又不想加密，就赋值给id字段
        id: row.userId,
        date: this.searchForm.date,
      })
    },
    mixinRouterReplace(name, query) {
      this.$router.replace({
        name,
        query,
      })
    },
    mixinResetDataList(DefaultSearchForm) {
      this.searchForm = { ...DefaultSearchForm }
      this.getDataList(1)
    },
    searchFormFormat(params) {
      const { companyId } = params
      // 级联选择器取最后一个数值
      params.companyId =
        companyId && companyId.length ? companyId[companyId.length - 1] : ''
      params.date = dayjs(params.date).format('YYYY年MM月')
      return params
    },
    async getDataList(pageNo) {
      pageNo && (this.searchForm.pageNo = pageNo)
      let params = { ...this.searchForm }
      this.searchFormFormat && (params = await this.searchFormFormat(params))
      getPageDataApi(this.pageUrl, this.pageMethod || 'post', params).then(
        (res) => {
          this.pageData = res.records || []
          this.pageTotal = res.total || 0
          this.$nextTick(() => {
            this.$refs.tableRef.doLayout()
          })
        }
      )
    },
  },
}
</script>
<style></style>
