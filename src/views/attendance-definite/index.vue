<template>
  <hs-layout>
    <hs-breadcrumb
      slot="page-breadcrumb"
      :list="breadcrumbList"
      :path="$route.query.id ? '/attendanceManage' : ''"
    />
    <el-form
      slot="search"
      :inline="true"
      :model="searchForm"
      ref="searchFormRef"
      label-width="90px"
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
        label="姓名"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="单位" prop="companyName" show-overflow-tooltip />
      <el-table-column
        label="部门"
        prop="departmentName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="年月"
        prop="date"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="日期" header-align="center">
        <el-table-column
          v-for="(item, index) in tableDateList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width || ''"
          :min-width="41"
          class-name="date-col"
          :label-class-name="
            ('date-col',
            item.week === 6 || item.week === 0 ? 'red-table-col' : '')
          "
        >
          <template slot-scope="{ row }">
            <el-button
              type="text"
              :style="{
                'font-size': '16px',
                'margin-left': '-4px',
              }"
              @click="dayClick(row, item)"
            >
              {{ row[item.prop] }}
            </el-button>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="请假天数"
        min-width="70"
        prop="askForLeaveDays"
      ></el-table-column>
      <el-table-column label="加班合计">
        <el-table-column label="双休日">
          <template slot-scope="{ row }">
            <el-button type="text" @click="workClick(row, 'weekendWorkDays')">
              {{ row.weekendWorkDays }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="法定节假日" min-width="100">
          s
          <template slot-scope="{ row }">
            <el-button type="text" @click="workClick(row, 'holidayWorkDays')">
              {{ row.holidayWorkDays }}
            </el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <dialog-import ref="dialogImport" />
    <!-- 修改日期状态 -->
    <changeDayTypeDialogVue
      ref="changeDayTypeDialogVue"
      @update="updateTable"
    />
    <!-- 修改加班天数 -->
    <changeDayWorkDialogVue
      ref="changeDayWorkDialogVue"
      @update="updateTable"
    />
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
import { getPageApi } from '@/apis/common'
import changeDayTypeDialogVue from './change-day-type-dialog.vue'
import changeDayWorkDialogVue from './change-day-work-dialog.vue'
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
    date: dayjs(new Date()).format('YYYY-MM'),
    userId: '',
  }
}
export default {
  name: 'attendance-definite',
  mixins: [pageListMixin],
  components: { changeDayTypeDialogVue, changeDayWorkDialogVue },
  data() {
    return {
      breadcrumbList: ['考勤明细'],
      pageUrl: '/check-on-work/queryDetailPage',
      searchForm: DefaultSearchForm(),
      DefaultSearchForm: Object.freeze(DefaultSearchForm()),
      tableDateList: [],
      // 1 正常上班√，2 旷工×  3 迟到早退△  4 请假○◯〇  5 加班☆  6  双休、节假日 /
      // daysTypeMap: {
      //   1: '√',
      //   2: '×',
      //   3: '△',
      //   4: '〇',
      //   5: '⭐',
      //   6: '/',
      // },
    }
  },
  created() {
    const { id, date } = this.$route.query
    if (id) {
      this.searchForm.userId = id
      this.searchForm.date = date
    }
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
    dayClick(row, item) {
      this.$refs.changeDayTypeDialogVue.showDialog(row, item)
    },
    workClick(row, key) {
      this.$refs.changeDayWorkDialogVue.showDialog(row, key)
    },
    getMonthDays(time) {
      const year = new Date(time).getFullYear()
      let month = new Date(time).getMonth() + 1
      return new Date(year, month, 0).getDate()
    },
    formatTableDateList() {
      this.tableDateList = []
      for (let i = 1; i <= this.getMonthDays(this.searchForm.date); i++) {
        const week = new Date(this.searchForm.date + '-' + i).getDay()
        this.tableDateList.push({
          label: i + '',
          prop: `day${i}`, // 后端返回day1,day2,day3....
          week,
        })
      }
    },
    updateTable() {
      this.getDataList()
    },
    selectComponyChange(val) {
      const last = val && val[val.length - 1]
      last && this.$refs.selectDepartment.getAllList(val[val.length - 1])
      this.searchForm.departmentId = ''
    },
    getDataList(pageNo) {
      pageNo && (this.searchForm.pageNo = pageNo)
      let params = { ...this.searchForm }
      this.formatTableDateList()
      this.searchFormFormat && (params = this.searchFormFormat(params))
      getPageApi(this.pageUrl, this.pageMethod || 'post', params).then(
        (res) => {
          this.pageData = res.records || []
          this.pageTotal = res.total || 0
          this.$nextTick(() => {
            this.$refs.tableRef.doLayout()
          })
        }
      )
    },
    searchFormFormat(params) {
      const { companyId } = params
      params.companyId =
        companyId && companyId.length ? companyId[companyId.length - 1] : ''
      params.date = dayjs(params.date).format('YYYY年MM月')
      return params
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep .date-col .cell {
  padding-left: 10px !important;
  text-align: center;
}
::v-deep .red-table-col {
  color: red;
}
</style>
