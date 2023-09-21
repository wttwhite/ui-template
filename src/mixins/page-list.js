import { getPageDataApi } from '@/apis/common'
export default {
  data() {
    return {
      tableLoading: false,
      pageTotal: 0,
      pageData: [{ id: 1 }],
    }
  },
  methods: {
    resetDataListMixin(DefaultSearchForm) {
      this.searchForm = { ...DefaultSearchForm }
      this.getDataListMixin(1)
    },
    async getDataListMixin(pageNo) {
      pageNo && (this.searchForm.pageNo = pageNo)
      let params = { ...this.searchForm }
      this.searchFormFormat && (params = await this.searchFormFormat(params))
      this.tableLoading = true
      getPageDataApi(this.pageUrl, this.pageMethod || 'post', params)
        .then((res) => {
          this.pageData = res.records || []
          this.pageTotal = res.total || 0
          this.$nextTick(() => {
            this.$refs.tableRef?.doLayout()
          })
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
  },
}
