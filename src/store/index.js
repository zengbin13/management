import Vue from "vue";
import Vuex from "vuex";
import { Login } from "@/api/login";
import { setToKen, setUserName, getUserName } from "@/utils/cookie.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    toKen: "",
    userName: getUserName() || "管理员",
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      //html5本地存储
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    },
    SET_TOKEN(state, value) {
      state.toKen = value;
    },
    SET_USERNAME(state, value) {
      state.userName = value;
    },
  },
  actions: {
    login({ commit }, requestData) {
      return new Promise((resolve, reject) => {
        Login(requestData)
          .then((response) => {
            console.log(response);
            //登陆成功，保存token userName
            const token = response.data.data.token;
            const username = response.data.data.username;
            commit("SET_TOKEN", token);
            commit("SET_USERNAME", username);
            setToKen(token);
            setUserName(username);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  modules: {},
});
