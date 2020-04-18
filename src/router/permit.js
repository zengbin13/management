import router from "./index";
import { getToKen } from "@/utils/cookie.js";
import { Message } from "element-ui";

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
    Message({
      type: "warning",
      message: "请先进行登录",
      showClose: true,
    });
    next("/login");
  }
  //不存在 且在login页
  if (!getToKen() && flag) {
    next();
  }
});
