import router from "./index";
import { getToKen } from "@/utils/cookie.js";

//设置白名单
const whiteRouter = ["/login"];
// 路由守卫
router.beforeEach((to, from, next) => {
  let flag = whiteRouter.indexOf(to.path) !== -1;
  //flag为true页面 页面为 "/login"
  if (getToKen()) {
    next();
  }
  //存在 且在login页
  if (getToKen() && flag) {
    next("/index");
  }
   //不存在 且不在login页
  if (!getToKen() && !flag) {
    next("/login");
  }
  //不存在 且在login页
  if (!getToKen() && flag) {
    next();
  }
});
