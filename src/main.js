import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

//全局样式库

//normalize
import "normalize.css";
//element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import "./theme/index.css";
Vue.use(ElementUI);

//全局组件
//svg-icon组件
import "./icons/index";

//功能插件
// import "./utils/setRem";
import "./router/permit";


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
