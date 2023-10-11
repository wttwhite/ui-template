<template>
  <section class="page-container">
    <van-cell-group>
      <van-cell
        v-for="(item, index) in detailProps"
        :key="index"
        :title="item.label"
        :value="
          item.span === 0.5 ? '' : $valueFormatEmpty(detailData[item.key])
        "
        :label="
          item.span === 0.5 ? $valueFormatEmpty(detailData[item.key]) : ''
        "
      />
      <files-list :ids="detailData.fileIds" />
    </van-cell-group>
  </section>
</template>
<script>
import sealManageApi from '@/apis/seal-manage'
import { DetailProps } from './const'
export default {
  name: 'seal-detail',
  data() {
    return {
      detailData: {},
      detailProps: [...DetailProps],
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      sealManageApi.getDetailById(
        {
          success: (res) => {
            this.detailData = res.data
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
