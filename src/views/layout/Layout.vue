<template>
  <el-container class="layout">
    <el-aside width="200px">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from './chilren/LayoutAside'
export default {
  name: "Layout",
  components: {
    LayoutAside
  }
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}
</style>
