<template>
  <el-aside class="layout-aside" :class="{isCollapse: isCollapse}" width="200px">
    <!-- logo -->
    <h1 class="logo">
      <a href="#">
        <img src="@/assets/img/logo.png" alt="logo" class="vue" :class="{isVue: isCollapse}" />
        <!-- <svg-icon icon-class="vue" class="vue"></svg-icon> -->
      </a>
    </h1>
    <!-- nav menu -->
    <el-menu :collapse="isCollapse" :collapse-transition="true" :router="true" text-color="#fff" active-text-color="#fff" :unique-opened="true" default-active="/index" class="el-menu-nav">
      <template v-for="(submenu, index) in navList">
        <el-submenu v-if="submenu.meta" :key="index" :index="submenu.path">
          <template slot="title">
            <svg-icon :icon-class="submenu.meta.icon" class="icon"></svg-icon>
            <span>{{submenu.meta.name}}</span>
          </template>
          <template v-for="(item, index) in submenu.children">
            <el-menu-item :key="index" :index="item.path" v-if="!item.hidden">
              {{item.meta.name}}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import SvgIcon from "@/components/svgIcon/SvgIcon";
export default {
  name: "LayoutAside",
  data() {
    return {
      navList: []
    };
  },
  components: {
    SvgIcon
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.isCollapse;
    }
  },
  mounted() {
    this.navList = this.$router.options.routes;
  }
};
</script>

<style lang="scss">
.layout-aside {
  height: 100vh;
  background-color: $bgColor;
  overflow: hidden;
  @include webkit(transition, all 1s ease 0s);
}
.isCollapse {
  width: 60px !important;
  .vue {
    width: 35px !important;
    height: 35px !important;
  }
}
.layout-aside {
  .logo {
    margin: 0 0 20px;
    text-align: center;
    .vue {
      width: 80px;
      height: 80px;
      margin-top: 30px;
      @include webkit(transition, all 1s ease 0s);
    }
  }
  .icon {
    margin-right: 12px;
  }
  .el-menu-nav {
    border: none;
    background-color: #344a5f;
    .el-submenu__title {
      background-color: transparent;
      &:hover {
        background-color: rgb(226, 150, 150);
      }
    }
    .el-menu-item {
      text-indent: 6px;
      background-color: rgba($color: #344a5f, $alpha: 0.8);
      &:hover {
        background-color: rgb(226, 150, 150);
      }
    }
  }
}
</style>
