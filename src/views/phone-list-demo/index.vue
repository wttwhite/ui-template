<template>
  <section class="page-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <section
        v-for="(item, index) in list"
        :key="index"
        class="page-list-content"
        @click="detailClick(item)"
      >
        <div class="title">{{ item.companyName }}</div>
        <section class="content-box">
          <div
            v-for="obj in cardList"
            :key="obj.key"
            :class="[
              'single-obj',
              obj.span === 2 && 'single-obj-col2',
              obj.span === 0.5 && 'single-obj-two',
            ]"
          >
            <div>{{ obj.label }}</div>
            <div
              :class="['value-box', obj.type === 'textarea' && 'textarea-wrap']"
            >
              {{ item[obj.key] || '-' }}
            </div>
          </div>
        </section>
      </section>
    </van-list>
  </section>
</template>
<script>
import canteenManageApi from '@/apis/canteenmanage'
export default {
  name: 'dinner-list',
  data() {
    return {
      loading: false,
      finished: false,
      finishedText: '没有更多了',
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      list: [],
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
  methods: {
    onLoad() {
      this.getList()
    },
    detailClick(item) {
      this.$router.push({
        name: 'reserveDinnerDetail',
        query: {
          id: item.companyId,
        },
      })
    },
    // 获取列表
    getList() {
      canteenManageApi.queryCollectByPage(
        {
          success: (res) => {
            this.list.push(...res.data.records)
            this.query.pageNo++
            if (res.data.size * res.data.current > res.data.total) {
              this.finished = true
            } else {
              this.loading = false
            }
          },
          error: () => {
            this.finishedText = '加载数据失败'
            this.finished = true
          },
          final: () => {
            this.loading = false
          },
        },
        this.query
      )
    },
  },
}
</script>
<style lang="scss" scoped></style>
