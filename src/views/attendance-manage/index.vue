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
      <el-form-item label="单位">
        <select-compony
          v-model="searchForm.companyId"
          clearable
          @change="selectComponyChange"
        />
      </el-form-item>
      <el-form-item label="部门">
        <select-department
          ref="selectDepartment"
          v-model="searchForm.departmentId"
          clearable
        />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" clearable maxlength="50" />
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
    <el-table :data="pageData" height="100%" stripe ref="tableRef">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column
        v-for="(item, index) in TableColumnList"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || ''"
        :min-width="item.minWidth || ''"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span v-if="!item.format">{{ row[item.prop] }}</span>
          <span v-else>
            <span v-if="item.format === 'name'">
              <el-button type="text" @click="detailClick(row)">
                {{ row[item.prop] }}
              </el-button>
            </span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <dialog-import ref="dialogImport" />
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
import pageListMixin from '@/mixins/page-list'
import { TableColumnList } from './const'
import { AbnormalStateList } from '@/utils/const'
import { exportExcel } from '@/apis/nhctkqgl'
import { downloadFile } from 'hsja-utils'
import dayjs from 'dayjs'
const DefaultSearchForm = () => {
  return {
    pageNo: 1,
    pageSize: 10,
    companyId: '',
    departmentId: '',
    name: '',
    stationId: '',
    date: dayjs(new Date()).format('YYYY-MM'),
    abnormalType: '',
  }
}
export default {
  name: 'attendance-manage',
  mixins: [pageListMixin],
  data() {
    return {
      breadcrumbList: ['考勤管理'],
      searchForm: DefaultSearchForm(),
      DefaultSearchForm: Object.freeze(DefaultSearchForm()),
      TableColumnList: Object.freeze(TableColumnList),
      AbnormalStateList: Object.freeze(AbnormalStateList),
      pageUrl: '/check-on-work/queryCheckOnWorkPage',
    }
  },
  mounted() {
    this.getDataList(1)
  },
  methods: {
    importClick() {
      this.$refs.dialogImport.showDialog()
    },
    async exportClick() {
      const res = await exportExcel({
        ...this.searchForm,
        date: dayjs(this.searchForm.date).format('YYYY年MM月'),
      })
      downloadFile(res)
    },
    detailClick(row) {
      this.mixinRouterReplace('attendanceDefinite', {
        // 地址栏上写明userId怪怪的，又不想加密，就赋值给id字段
        id: row.userId,
        date: this.searchForm.date,
      })
    },
    selectComponyChange(val) {
      const last = val && val[val.length - 1]
      last && this.$refs.selectDepartment.getAllList(val[val.length - 1])
      // 切换公司，部门置空
      this.searchForm.departmentId = ''
    },
    searchFormFormat(params) {
      const { companyId } = params
      // 级联选择器取最后一个数值
      params.companyId =
        companyId && companyId.length ? companyId[companyId.length - 1] : ''
      params.date = dayjs(params.date).format('YYYY年MM月')
      return params
    },
  },
}
</script>
<style></style>
