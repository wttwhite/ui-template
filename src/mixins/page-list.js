import { getPageApi } from '@/apis/common'

export default {
  data() {
    return {
      pageTotal: 0,
      pageData: [],
    }
  },
  methods: {
    mixinBtnClick(row, methodName) {
      this[methodName](row)
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
    getDataList(pageNo) {
      pageNo && (this.searchForm.pageNo = pageNo)
      let params = { ...this.searchForm }
      // this.pageData = [{ id: '1', projectName: 1 }]
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
  },
}
