<template>
  <el-cascader
    :options="list"
    v-model="selected"
    :props="{ checkStrictly: true, value: 'id', label: 'name' }"
    :clearable="clearable"
    :disabled="disabled"
    @change="selectedChange"
  ></el-cascader>
</template>
<script>
import { getCompanyTree } from '@/apis/xbase'
export default {
  name: 'select-compony',
  props: ['value', 'disabled', 'clearable'],
  watch: {
    value: {
      handler(n) {
        this.selected = n
      },
      immediate: true,
    },
    selected: {
      handler(n) {
        this.$emit('input', n)
      },
    },
  },
  mounted() {
    this.getList()
  },
  data() {
    return {
      selected: '',
      list: [],
    }
  },
  methods: {
    async getList() {
      try {
        const data = await getCompanyTree()
        this.list = this.getTreeFilterChildren(data) || []
      } catch (error) {
        console.log('error', error)
      }
    },
    // 费用管理有完整的获取name的代码
    selectedChange(val) {
      this.$emit('change', val)
    },
    // 过滤children:[]的数据
    getTreeFilterChildren(options) {
      return options.map((item) => {
        return {
          ...item,
          children: item.children?.length
            ? this.getTreeFilterChildren(item.children)
            : null,
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
