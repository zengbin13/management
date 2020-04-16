<template>
  <div class="aside">
    <h1 class="logo">
      <a href="#">
        <img src="@/assets/img/logo.png" alt="logo">
      </a>
    </h1>
  </div>
</template>

<script>
export default {
  name: "LayoutAside"
};
</script>

<style lang="scss" scoped>
.aside {
  height: 100vh;
  background-color: $bgColor;
}
.logo {
  margin: 0;
  text-align: center;
  img {
    width: 80px;
    margin-top: 30px;
    box-shadow: 2px 0 12px 0 rgba($color: #ffffff, $alpha: 0.1);
  }
}
</style>
