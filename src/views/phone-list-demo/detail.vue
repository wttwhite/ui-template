<template>
  <section class="page-container">
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <!-- <van-cell title="单元格" value="内容" label="描述信息" /> -->
    </van-cell-group>
  </section>
</template>
<script>
import canteenManageApi from '@/apis/canteenmanage'
export default {
  name: 'dinner-list',
  data() {
    return {
      detailData: {},
      cardList: [
        {
          label: '就餐时间',
          key: 'diningDate',
          span: 2,
        },
        {
          label: '就餐时间',
          key: 'diningDate',
          span: 2,
        },
        {
          label: '部门名称',
          key: 'departmentName',
          span: 2,
        },
        {
          label: '就餐时间',
          key: 'diningDate',
          span: 2,
        },
        {
          label: '就餐时间',
          key: 'diningDate',
        },
        {
          label: '公司名称',
          key: 'companyName',
        },
        {
          label: '公司名称',
          key: 'companyName',
          span: 0.5,
          type: 'textarea',
        },
      ],
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      canteenManageApi.getCollectById(
        {
          success: (res) => {
            console.log('res', res)
          },
          error: (err) => {
            this.$notify({ message: err })
          },
        },
        {
          id: this.$route.query.id,
        }
      )
    },
  },
}
</script>
<style lang="scss" scoped></style>
