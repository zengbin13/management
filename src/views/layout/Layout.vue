<template>
  <el-container class="layout">
    <!-- nav content -->
    <layout-aside></layout-aside>
    <el-container direction="vertical">
      <!-- header content -->
      <layout-header></layout-header>
      <!-- main content -->
      <layout-main></layout-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from "./chilren/LayoutAside";
import LayoutHeader from "./chilren/LayoutHeader";
import LayoutMain from "./chilren/LayoutMain";
export default {
  name: "Layout",
  components: {
    LayoutAside,
    LayoutHeader,
    LayoutMain
  }
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}
</style>
