<template>
  <el-header height="75px" class="header clearfix">
    <div class="pull-left menu" @click="collapseAside()">
      <svg-icon icon-class="menu" class="icon-menu"></svg-icon>
    </div>
    <div class="user-info pull-right">
      <img src="../../../assets/img/avatar.jpeg" alt="avatar" />
      <span>管理员</span>
      <div class="exit">
        <svg-icon icon-class="power" class="icon-power"></svg-icon>
      </div>
    </div>
  </el-header>
</template>

<script>
import SvgIcon from "../../../components/svgIcon/SvgIcon";
export default {
  name: "LayoutHeader",
  components: {
    SvgIcon
  },
  methods: {
    collapseAside() {
      this.$store.commit({
        type: "SET_COLLAPSE"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding: 0;
  line-height: 75px;
  @include webkit(box-shadow, 0px 3px 12px 0 rgba($color: #000000, $alpha: 0.1));
  z-index: 30;
}
.menu {
  height: 75px;
  .icon-menu {
    font-size: 24px;
    margin-left: 20px;
  }
}
.user-info {
  height: 75px;
  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    vertical-align: middle;
  }
  span {
    font-size: 14px;
    color: $mainText;
    margin: 0 16px;
  }
  .exit {
    display: inline-block;
    width: 75px;
    border-left: 1px solid #ededed;
    .icon-power {
      font-size: 24px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
