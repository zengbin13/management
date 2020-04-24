import { GetCategoryAll } from "../../api/info";

const state = {
  categoryData: {},
};
const getters = {};
const mutations = {
  SET_CATEGORY_DATA(state, value) {
    state.categoryData = value;
  },
};
const actions = {
  getCategoryAll({ commit }) {
    return new Promise((resolve, reject) => {
      GetCategoryAll()
        .then((response) => {
          const data = response.data.data;
          //如果在实例创建之后添加新的属性到实例上，它不会触发视图更新
          data.forEach((item) => {
            item.secondFlag = true;
            item.iconName = "subtract";
          });
          commit("SET_CATEGORY_DATA", data);
          resolve(data);
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
