import { Login } from "@/api/login";
import {
  setToKen,
  setUserName,
  getUserName,
  removeUserName,
  removeToKen,
} from "@/utils/cookie.js";
const state = {
  toKen: "",
  userName: getUserName() || "管理员",
};
const getters = {};
const mutations = {
  SET_TOKEN(state, value) {
    state.toKen = value;
  },
  SET_USERNAME(state, value) {
    state.userName = value;
  },
  EXIT_LOGIN(state) {
    removeUserName();
    removeToKen();
    state.toKen = "";
    state.userName = "";
  },
};
const actions = {
  login({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData)
        .then((response) => {
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
