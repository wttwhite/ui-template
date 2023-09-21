<template functional>
  <div class="detail-box" v-loading="props.loading">
    <slot name="page-breadcrumb"></slot>

    <div class="detail-box-content">
      <slot></slot>
    </div>

    <div class="page-footer" v-if="props.footerBtn">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hs-layout-detail',
  props: {
    footerBtn: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-box {
  height: 100%;
  width: 100%;
  min-width: 840px;
  display: flex;
  flex-direction: column;
  .detail-box-content {
    border-radius: 8px;
    padding: 15px;
    overflow: auto;
  }
  .page-footer {
    height: 60px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
