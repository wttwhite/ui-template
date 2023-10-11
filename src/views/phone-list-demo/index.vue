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
        <div class="title">{{ item.sealTypeName }}</div>
        <section class="content-box">
          <div
            v-for="obj in listProps"
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
import sealManageApi from '@/apis/seal-manage'
import { ListProps } from './const'
export default {
  name: 'seal-list',
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
      listProps: Object.freeze(ListProps),
    }
  },
  methods: {
    onLoad() {
      this.getList()
    },
    detailClick(item) {
      this.$router.push({
        name: 'sealManageDetail',
        query: {
          id: item.id,
          applyType: item.applyType,
        },
      })
    },
    // 获取列表
    getList() {
      sealManageApi.queryByPage(
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
