<template>
  <hs-layout-detail>
    <hs-breadcrumb
      slot="page-breadcrumb"
      :list="breadcrumbList"
      :goBack="cancelClick"
    />
    <el-card>
      <div slot="header">
        <span>基本信息</span>
      </div>
      <el-descriptions
        direction="vertical"
        :column="2"
        size="medium"
        class="common-descriptions"
        :colon="false"
      >
        <el-descriptions-item
          v-for="(item, index) in descList"
          :key="index"
          :label="item.label"
          :span="item.span || 1"
        >
          <span class="common-desc-item-text">{{ detailData[item.key] }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="footer-btn">
      <el-button type="plain" @click="cancelClick">取消</el-button>
    </div>
  </hs-layout-detail>
</template>
<script>
// import {getDetail }from '/'
export default {
  name: 'approval-borrow-detail',
  data() {
    return {
      breadcrumbList: ['年度考核', '详情'],
      descList: [
        { label: '年度', key: 'departmentName' },
        { label: '单位', key: 'borrowMoney' },
        { label: '部门', key: 'userName' },
        { label: '姓名', key: 'applyDate' },
        { label: '考核结果', key: 'useTo' },
      ],
      detailData: {},
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const data = await getDetail({ id: this.$route.query.id })
      this.descList.forEach((item) => {
        this.$set(this.detailData, item.key, data[item.key] || '')
      })
      this.$set(this.detailData, 'fileIds', data['fileIds'] || '')
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
.common-descriptions {
  //   .el-descriptions-item__label {
  //     width: 80px !important;
  //     justify-content: flex-start;
  //     margin-right: 20px;
  //   }
  .common-desc-item-text {
    color: rgb(153, 153, 153);
  }
}
.footer-btn {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
</style>
