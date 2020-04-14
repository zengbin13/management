import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

//全局样式库- element and normalize
import "normalize.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import "./theme/index.css";
Vue.use(ElementUI);
//功能插件
// import "./utils/setRem";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
