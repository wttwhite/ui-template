<template>
  <el-select
    v-model="selected"
    placeholder="请选择"
    :clearable="clearable"
    :disabled="disabled"
    :filterable="filterable"
  >
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>
<script>
import { getDeptTree } from '@/apis/xbase'
export default {
  name: 'select-department', // 部门下拉
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
  },
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
  mounted() {},
  data() {
    return {
      selected: '',
      list: [],
    }
  },
  methods: {
    // 获取所有部门
    async getAllList(parentId) {
      const data = await getDeptTree({
        parentId,
      })
      this.list = data || []
    },
  },
}
</script>
<style lang="scss" scoped></style>
