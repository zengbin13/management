module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16, //表示根元素的字体大小  设计稿1920px 页面换算为120rem
      unitPrecision: 5, //rem的精度
      propList: ["*"], //能够转换的css属性
      selectorBlackList: [], //以选择器忽略转换的名单
    }
  }
};
