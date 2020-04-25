<template>
  <el-table :data="tableData" border stripe>
    <!-- 多选 -->
    <el-table-column v-if="tableConfig.selection" type="selection" width="55"></el-table-column>
    <!-- 基本内容 -->
    <el-table-column v-for="item in tableConfig.theadData" :prop="item.field" :key="item.label" :label="item.label" :width="item.width">
    </el-table-column>
  </el-table>

</template>

<script>
export default {
  name: "base-table",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    tableConfig: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
