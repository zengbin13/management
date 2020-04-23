import Vue from 'vue'
import SvgIcon from '../components/svgIcon/SvgIcon.vue'// svg组件

// 注册到全局
Vue.component('svg-icon', SvgIcon)

//解析下载的svg文件
const req = require.context('./svg', false, /\.svg$/) 
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)

// `require.context('./svg', false, /\.svg$/)`
// - 参数
//   - 目录
//   - 是否遍历子级目录
//   - 定义遍历文件规则
// - 返回值——require.context模块导出一个（require）函数
// - 导出方法属性
//   - resolve 函数，返回请求被解析后得到的模块 id
//   - keys 函数，返回一个数组，由所有可能被上下文模块处理的请求组成
//   - id 是上下文模块里面所包含的模块 id