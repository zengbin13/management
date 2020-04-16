<template>
  <el-main class="main">
    <router-view></router-view>
  </el-main>
</template>
<script>
export default {
  name: "LayoutMain"
};
</script>

<style lang="scss" scoped>
.main {
  border-top: 30px solid #f5f5f5;
  border-left: 30px solid #f5f5f5;
  padding: 30px 30px 0;
}
</style>
