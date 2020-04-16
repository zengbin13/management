import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/console",
    redirect: "/index",
    component: () => import("../views/layout/Layout.vue"),
    meta: {
      icon: "console",
      name: "控制台"
    },
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("../views/console/Console.vue"),
        meta: {
          name: "主页"
        },
      },
    ],
  },
  {
    path: "/info",
    name: "Info",
    redirect: "/info/list",
    component: () => import("../views/layout/Layout.vue"),
    meta: {
      icon: "info",
      name: "信息管理"
    },
    children: [
      {
        path: "/info/list",
        name: "InfoList",
        component: () => import("../views/info/InfoList.vue"),
        meta: {
          name: "信息列表"
        },
      },
      {
        path: "/info/category",
        name: "InfoCategory",
        component: () => import("../views/info/InfoCategory.vue"),
        meta: {
          name: "信息分类"
        },
      },
    ],
  },
  {
    path: "/user",
    redirect: "/user/list",
    component: () => import("../views/layout/Layout.vue"),
    meta: {
      icon: "user",
      name: "用户管理"
    },
    children: [
      {
        path: "/user/list",
        name: "User",
        component: () => import("../views/user/User.vue"),
        meta: {
          name: "用户"
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
