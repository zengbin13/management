## 项目笔记

### **1.创建vue项目**

```shell
vue create management
```

### **2.创建git仓库**

```shell
git init
git remote add origin https://github.com/zengbin13/management.git
git checkout -b dev
git checkout -b feature-Vuemanagement-V1.0.0-20200414
git add .
git commit -m "初始化项目"
git push
```

### **3.vue.config.js**

```js
const path = require("path");

module.exports = {
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: "/",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,
  // webpack相关配置
  chainWebpack: config => {
    //别名解析
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", path.resolve(__dirname, "./src"));
    //svg文件解析配置
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/icons"]
      });
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 生产环境
      config.mode = "production";
    } else {
      // 开发环境
      config.mode = "development";
    }
  },
  // css相关配置
  css: {
    // 是否分离css（插件ExtractTextPlugin）
    extract: true,
    // 是否开启 CSS source maps
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
    },
    // 是否启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  // 是否使用 thread-loader
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 编译完成是否打开网页
    host: "0.0.0.0", // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    proxy: null, // 设置代理
    overlay: {
      // 全屏模式下是否显示脚本错误
      warnings: true,
      errors: true
    },
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    
  }
};
```

### **4.创建样式文件夹 styles**

```js
//vuw.config.js
css: {
    // 是否分离css（插件ExtractTextPlugin）
    extract: true,
    // 是否开启 CSS source maps
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "./src/styles/main.scss";`
      }
    },
    // 是否启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
```

```scss
//config.scss
// 主题颜色
$bgColor: #00d2d3;

// 常用样式
.pull-left {
  float: left;
}
```

### **5.重置浏览器样式**

```shell
npm install normalize.css -D
```

```js
//main.js
import "normalize.css";
```

### 6.引入element UI框架

```shell
npm install element-ui -S
```

```js
//main.js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

### 7.使用postcss-pxtorem适配

```shell
npm install postcss-pxtorem -D
```

```js
//postcss.config.js
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
```

```js
//utils/setRem.js
//1.设计稿1rem的宽度
const baseSize = 16;
//2.setrem 函数
function setRem() {
  //2.1获取浏览器的窗口宽度
  const htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  //2.2 实际设备页面宽度和 设计稿 的比值
  const scale = htmlWidth / 1920;
  //2.3设置根元素字体大小
  document.querySelector("html").style.fontSize = baseSize * scale + "px";
}
//3.初始化
setRem();
//4.监听浏览器窗口变化
window.addEventListener("resize", () => {
  setRem();
});
```

```js
//main.js
```

### 8.login页面的UI

1. 对*.el-form-item__label*样式重置时，不能使用 scoped,否则样式不能生效
2. el-form表单验证函数，使用prop匹配

### 9.表单验证规则

```js
//utils/validate.js
//过滤特殊字符串
stripscript(str) {
    let pattern = new RegExp("[`~ !@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&%;—|{}【】‘；：”“'。，、？]")
    let resultStr =""
    for(let value of str) {
        resultStr = resultStr + value.replace(pattern, "")
    }
    return resultStr
}
//验证邮箱格式
export function validateMailFormat(str) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(str);
}
```

### 10.封装ajax请求对象

```shell
npm install axios -D
```

```js
//utils/request.js
//1.导入axios
import axios from "axios";
//2.创建实例
const service = axios.create({
  //存在跨域问题
  baseURL: "http://www.web-jshtml.cn/productapi/token",
  timeout: 5000,
});
//3.添加请求和响应拦截器
service.interceptors.request.use(
  (config) => {
    //请求之前的数据处理
    return config;
  },
  (error) => {
    //请求出错的处理
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
//导出封装的axios
export default service;
```

### 11.login页面的请求api

![1581906927117](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1581906927117.png)

```js
//api/login.js
import service from "../utils/request";
//接口名称：登录获取验证码
export function GetCheckCode(data) {
  return service.request({
    url: "/getSms/",
    method: "POST",
    data
  });
}
```

### 12.代理跨域的处理

- 使用环境变量配置BASEURL

```js
//utils/request.js
const BASEURL = process.env.NODE_ENV === "prodution" ? "" : "/api"
```

- 利用node.js创建一个本地服务器进行代理

```js
//vue.config.js
devServer: {
    proxy: {
      ///api开头的接口，代理访问规则
      "/api": {
        target: "http://www.web-jshtml.cn/productapi", //代理的域名
        changeOrigin: true, //是否启用代理
        pathRewrite: {  //重写请求
          "^/api": ""
        }
      }
    },
}
```

- 以请求 `/getSms`为例
  - 开发环境， baseURL为 `/api`, url为 `/api/getSms`
  - 以 `/api`开头符合代理规则，代理路径将为 `http://www.web-jshtml.cn/productapi/api/getSms`
  - 但是url为 `/api/getSms`符合重写规则 `/api`开头 ，url为 `/getSms`
  - 最终代理url为 `http://www.web-jshtml.cn/productapi/getSms`

### 13.响应拦截器对resCode处理

```js
//utils/request.js

//0.使用element的消息提示
import { Message } from "element-ui";

service.interceptors.response.use(
  (response) => {
    //对响应错误码进行判断，错误码使用message通知
    let data = response.data;
    if (data.resCode !== 0) {
      Message({
        showClose: true,
        message: data.message,
        type: "error",
      });
      return Promise.reject(error);
    } else {
      Message({
        showClose: true,
        message: data.message,
        type: "success",
      });
      return response;
    }
  })
```

### 14.测试用例完善login页面功能

![1586955568243](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1586955568243.png)

### 15.sha1/md5 密码进行加密

常用加密方式 ： `base64`、 `md5`、`sha1`

```shell
npm install js-sha1 --save
```

```js
import sha1 from "js-sha1"
//对登录、注册请求中的密码进行加密
sha1(data.password)
```

```js
//request
password: "9fbe93d02feed92cb86769b943b24d85628992aa"
```

- 在前端预先加密一次
  - 登录的密码：123456（普通字符串）
  - 前端加密后：sha1('123456') == '541216ad5s4f5ds1f5asd4f65asd4' （加密后的字符串）

- 后台加密
  - 接收到字符串：'541216ad5s4f5ds1f5asd4f65asd4'
  - 后台再次加密：md5('541216ad5s4f5ds1f5asd4f65asd4') == '8f9qwersd3g165y4d1sf3s1f6aew4'（最终的加密后的密码）
  - 写入数据库：8f9qwersd3g165y4d1sf3s1f6aew4

- 登录
  用户名与加密后的密码进行匹配，成功则登录，失败则提示



### 16.登录跳转——路由跳转

数据校验完成，点击登录请求登录api成功回调跳转到console页面

**非函数式**

```html
<!--不带参数-->
<router-link :to="{name:'home'}"> 
<router-link :to="{path:'/home'}">
<!--带参数-->
<router-link :to="{name:'home', params: {id:1}}">
```

**函数式**

```js
this.$router.push({path:'/home',query: {id:'1'}})
this.$router.push({name:'home',params: {id:'1'}})
```

- 使用`query`传参跳转配合`path`属性，参数在url可见，刷新参数不消失
- 使用`params`传参跳转配合`path`属性,参数不可见

![1587127023062](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1587127023062.png)

### 17.全局的SvgIcon组件

1. SvgIcon组件的代码

   ```vue
   //components/svgIcon/SvgIcon.vue
   <template>
     <svg :class="svgClass" aria-hidden="true">
       <use :xlink:href="iconName"></use>
     </svg>
   </template>
   
   <script>
   export default {
     name: 'svg-icon',
     props: {
       iconClass: {
         type: String,
         required: true
       },
       className: {
         type: String
       }
     },
     computed: {
       iconName() {
         return `#icon-${this.iconClass}`
       },
       svgClass() {
         if (this.className) {
           return 'svg-icon ' + this.className
         } else {
           return 'svg-icon'
         }
       }
     }
   }
   </script>
   
   <style scoped>
   .svg-icon {
     width: 1em;
     height: 1em;
     vertical-align: -0.15em;
     fill: currentColor;
     overflow: hidden;
   }
   </style>
   ```

2. 在icons/index.js中进行全局注册

   ```js
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
   ```

   `require.context('./svg', false, /\.svg$/)`

   - 参数
     - 目录
     - 是否遍历子级目录
     - 定义遍历文件规则
   - 返回值——require.context模块导出一个（require）函数
   - 导出方法属性
     - resolve 函数，返回请求被解析后得到的模块 id
     - keys 函数，返回一个数组，由所有可能被上下文模块处理的请求组成
     - id 是上下文模块里面所包含的模块 id

3. 在icons/svg文件夹中对使用的svg文件保存

4. main.js中引入

   ```js
   import "./icons/index"
   ```

5. vue.config.js中对 `.svg`文件解析规则的配置

   ```js
   // webpack相关配置
     chainWebpack: (config) => {
       //svg文件解析配置
       const svgRule = config.module.rule("svg");
       svgRule.uses.clear();
       svgRule
         .use("svg-sprite-loader")
         .loader("svg-sprite-loader")
         .options({
           symbolId: "icon-[name]",
           include: ["./src/icons"],
         });
     },
   ```

6. 安装svg文件依赖

   ```shell
   npm i svg-sprite-loader --save
   ```

### 18.对CSS3样式的兼容处理

```scss
@mixin webkit($type, $value) {
  -webkit-#{$type}: $value;
  -moz-#{$type}: $value;
  -o-#{$type}: $value;
  -ms-#{$type}: $value;
  #{$type}: $value;
}
```

```scss
@include webkit(box-shadow, 0px 2px 12px 0 rgba(0, 0, 0, .1));
```

### 19.控制台布局——嵌套路由

```js
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
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("../views/console/Console.vue"),
      },
    ],
  },
  {
    path: "/info",
    name: "Info",
    redirect: "/info/list",
    component: () => import("../views/layout/Layout.vue"),
    children: [
      {
        path: "/info/list",
        name: "InfoList",
        component: () => import("../views/info/InfoList.vue"),
      },
      {
        path: "/info/category",
        name: "InfoCategory",
        component: () => import("../views/info/InfoCategory.vue"),
      },
    ],
  },
  {
    path: "/user",
    redirect: "/user/list",
    component: () => import("../views/layout/Layout.vue"),
    children: [
      {
        path: "/user/list",
        name: "User",
        component: () => import("../views/user/User.vue"),
      },
    ],
  },
];
```

### 20.路由元信息传递数据

```js
//router/index.js
  {
    path: "/index",
    component: () => import("../views/layout/Layout.vue"),
    meta: {
      icon: "console",
      name: "控制台"
    },
    children: [
      {
        path: "",
        name: "Index",
        component: () => import("../views/console/Console.vue"),
        meta: {
          name: "主页"
        },
      },
    ],
  },
```

```js
  mounted() {
    console.log(this.$router);
  }
```

![1587044131963](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1587044131963.png)

### 21.兄弟组件传值——vuex

为控制侧边框的宽度，可以改变el-menu的collapse属性，

但是事件发生和数据的改变在同级别的组件中，可以使用vuex来管理该属性值

```js
export default new Vuex.Store({
  state: {
    isCollapse: false,
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {},
  modules: {}
});
```

```js
//兄弟组件1-commit触发
  methods: {
    collapseAside() {
      this.$store.commit({
        type: "SET_COLLAPSE"
      })
    }
  },
```

```js
//兄弟组件2-接收state改变
 computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  }
```


### 22.过渡动画transition

```css
.vue {
      width: 80px;
      height: 80px;
      @include webkit(transition, all 2s ease 0s);
    }
.vue:hover {
    width: 35px;
    height: 35px;
  }
```

```css
transition: property duration timing-function delay;
```

不具备继承性，每个元素的过渡动画需要单独设置

### 23.侧边框宽度保持——本地存储

通过store来管理isCollapse数据的值，但页面刷新宽度恢复初始值

利用本地存储将isCollapse的值存储在客户端中

```js
export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      //html5本地存储
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
    }
  },
});
```

**基础知识点**

1. **cookie_js**

   使用`cookie_js`提供的API `npm install cookie_js -S`

   - 存储

     ```js
     cookie.set("key","value")
     cookie.set({key1:"value1", key2: "value2"})
     ```

   - 获取

     ```js
     cookie.get('key');
     cookie.get(['key1', 'key2']);
     ```

   - 删除

     ```js
     cookie.remove('key'); 
     cookie.remove('key1', 'key2'); 
     cookie.remove(['key1', 'key2']);
     ```

2. **sessionStorage**

   临时性保存，关闭浏览器时清除；存储数据大小为5M；存储于客户端且只能存储字符串类型

   - 存储

     ```js
     window.sessionStorage.setItem("key","value");
     ```

   - 获取

     ```js
     window.sessionStorage.getItem("key");
     ```

   - 删除

     ```js
     window.sessionStorage.removeItem("key");
     ```

   - 清空

     ```js
     sessionStorage.clear();
     ```

3.   **localStorage**

   长期性存储，除非手动清除
   - 存储

     ```js
     window.localStorage.setItem("key","value");
     ```

   - 获取

     ```js
     window.localStorage.getItem("key");
     ```

   - 删除

     ```js
     window.localStorage.removeItem("key");
     ```

   - 清空

     ```js
     localStorage.clear();
     ```


### 24.身份验证——toKen 和 cookie

![1587127602389](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1587127602389.png)

- 登录成功时，API的回调函数将返回Token数据


​	![1587125923382](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1587125923382.png)

- 使用 `cookie_js`对本地cooike进行操作

```shell
npm install cookie_js --save
```

```js
//utils/cookie.js
import cookie from "cookie_js";

const adminToKen = "admin_toKen";
const userName = "userName";

export function getToKen() {
  return cookie.get(adminToKen);
}
export function setToKen() {
  return cookie.set(adminToKen, adminToKen);
}
export function getUserName() {
  return cookie.get(userName);
}
```

### 25.阻止非法进入——路由守卫

```js
//main.js
import "./router/permit";
```

```js
//router/permit.js

import router from "./index";
import { getToKen, getUserName } from "@/utils/cookie.js";
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
```

### 26.获取toKen保存在cookie

登录成功时在回调的数据中获取token并将其保存在store中

![1587131961451](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1587131961451.png)

```js
 //login.vue
  login(data) {
      this.$store
        .dispatch("login", data)
        .then((res) => {
          this.$router.push({ path: "/index" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
```

```js
//store/index.js
  state: {
    toKen: "",
    userName: "",
  },
  mutations: {
    SET_TOKEN(state, value) {
      state.toKen = value;
    },
    SET_USERNAME(state, value) {
      state.userName = value;
    },
  },
```

### 27.发送请求包含token信息

后台需要前端传相关的参数（在请求头添加参数）

```js
//utils/request.js
import {getToKen, getUserName} from '../utils/cookie'
//在请求拦截器中添加token信息
config.headers['Tokey'] = getToKen()
config.headers['UserName'] = getUserName()
```

### 28.异步的actions

为了方便在store中保存token、username

将登录的异步操作抽离到store中，由于是异步操作将在actions中处理

**触发**

Action 通过 `store.dispatch` 方法触发

```js
this.$store.dispatch("login", data)
```

**接收处理**

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象

```js
  actions: {
    login({ commit }, requestData) {
      return new Promise((resolve, reject) => {
        Login(requestData)
          .then((response) => {
            //登陆成功
            const token = response.data.data.token;
            const username = response.data.data.username;
            commit("SET_TOKEN", token);
            commit("SET_USERNAME", username);
            //通过提交mutation来改变state的值——保存token userName
            setToKen(token);
            setUserName(username);
            resolve(response);
          })
      });
    },
  },
```

**基础知识点**

![1587127506500](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1587127506500.png)

- **state**
  - state是存储的单一状态，是store的基本数据
- **Getters**
  - getters是store的计算属性，对state加工生成的派生数据
  - 如同计算属性返回值将被缓存，只有当依赖值改变时才会重新计算
- **Mutations**
  - mutations提交更改数据，通过store.commit更改state存储的状态
  - mutations只能处理同步操作
- **Actions**
  - Action 类似于 mutation
  - Action 提交的是 mutation，而不是直接变更状态
  - Action 可以包含任意异步操作
- **辅助函数**
  - Vuex提供mapState、mapGetters、mspMutations、mapActions辅助函数

### 28.vuex的模块化

```js
import app from "./modules/app";
import login from "./modules/login";

export default new Vuex.Store({
  modules: {
    app,
    login,
  },
});
```

```js
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
};
const getters = {};
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    //html5本地存储
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
};
const actions = {};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
```

**模块的局部状态**

1. 模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象state**
2. 模块内部的 action，`{ state, commit, rootState }`
3. 模块内部的 getter，根节点状态会作为第三个参数暴露 `(state, getters, rootState)`

**命名空间**

- 默认情况下，

  - 模块内部的 action、mutation 和 getter 是注册在**全局命名空间**
  - 访问state需要区分模块 

  ```js
  this.$store.state.app.isCollapse
  ```

- 注册命名空间

  - 添加 `namespaced: true`

  ```js
  this.$store.commit("login/EXIT_LOGIN")
  this.$store.commit({type: "app/SET_COLLAPSE"});
  ```

  ```js
  this.$store.dispatch("login/login", data)
  ```

**基础知识**

**Module**

- Module是store分割的模块
- 每个module都可以具备state、getters、mutations、actions

![1587187763305](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1587187763305.png)

### 30.sass混入样式——@mixin 

```scss
//styles/config.scss
@mixin label($align:center, $width:50, $line-height:40) {
  label {
    float: left;
    width: $width + px;
    text-align: $align;
    line-height: $line-height + px;
  }
  .wrap-content {
    margin-left: $width + px;
  }
}
```

```scss
@import "../../styles/config.scss";
.label-wrap {
  &.selected-type  {
    @include label(left, 60, 40)
  }
}
```

### 31.info页面的UI

> 如果在实例创建之后添加新的属性到实例上，它不会触发视图更新

### 32. .sync修饰符

在父组件向子组件传递数据时，使用prop但是由于prop是单项数据流，在子组件中应该避免直接更改prop

如果prop传递值需要在子组件改变怎么办呢，我们可以在子组件中使用watch来监听数据改变，并且改变时切换另一个布尔值来替代当前prop的功能

```vue
<!--父组件-->
<add-dialog :add-dialog="addDialog" @close-add-dialog="handleAddInfo()"></add-dialog>
```

```js
//子组件  
props: {
    addDialog: {
      type: Boolean,
      defalut: false
    }
  },
  data() {
    return {
      add_flag: false
    };
  },
  watch: {
    //监听prop的改变
    addDialog: function(newVal) {
      this.add_flag = newVal;
    }
  }
  methods: {
    closeDialog() {
      this.$emit("close-add-dialog");
    }
  }
```

**对一个 prop 进行“双向绑定”，在父组件时不进行逻辑处理只改变父组件传入的prop值，使用 .sync修饰符进行简写**

```html
<add-dialog :addDialog.sync="addDialog"></add-dialog>
```

```js
 props: {
    addDialog: {
      type: Boolean,
      defalut: false
    }
  },
  data() {
    return {
      add_flag: false
    };
  },
  watch: {
    addDialog: function(value) {
      this.add_flag = value;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:addDialog", false);
    }
  }
```

**基础知识**

```js
this.$emit('update:title', newTitle)
```

```html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

```html
<text-document v-bind:title.sync="doc.title"></text-document>
```

### 33.自定义全局方法

```js
//utils/global.js
export default {
  install(Vue, options) {
    Vue.prototype.$toTop = function() {
      console.log("Plugin Test");
    };
  },
};
```

```js
//main.js
// 全局方法
import global from "./utils/global";
Vue.use(global)
```

### 34.格式化时间戳

1. 月份为0-11，需要加一
2. 10位数的时间戳需要乘1000
3. getDay()获取星期几 / getDate()获取天数

```js
export function timeFormat(timer) {
  let time = new Date(timer * 1000);
  let YY = time.getFullYear();
  let MM =
    time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
  let DD = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();

  let hh = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  let mm = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  let ss = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
}
```

### 35.json对象赋值——for in

for-in循环属性 for-of循环属性值

```js
for (const key in this.dialogForm) {
    this.dialogForm[key] = value[key]
  }
```

### 36.合并分支

合并分支

```shell
git add . 
git commit -m "v1.0.0版本开发"
git pull 
git push
git status
git branch --list
git checkout dev
git merge --no-ff -m "合并分支" feature-vueManagement-V1.0.0-20200414
git push --set-upstream origin dev
```

创建并进入新的版本分支

```shell
git checkout -b feature-vueManagement-V1.0.1-20200423
git push --set-upstream origin feature-vueManagement-V1.0.1-20200423
```

### 37.v-for v-if

1. v-for 和v-if由于优先级问题不能在同意标签上，可以使用template包装
2. `!item.hidden`使用$route的属性值来判断是否渲染

```html
<template v-for="(item, index) in submenu.children">
	<el-menu-item :key="index" :index="item.path" v-if="!item.hidden">
    	{{item.meta.name}}
    </el-menu-item>
</template>
```



### 38.使用富文本编辑器

**依赖**

```shell
npm install vue-quill-editor –save
```

**引入**

```js
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'
```

**注册并使用组件**



### 39.七牛云保存图片

1. 注册账号

2. 创建存储空间

3. 绑定域名——用于访问存储的图片等信息

4. 域名解析

   - CNAME解析

   <img src="C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1587741742390.png" alt="1587741742390"  />

   - 域名管理平台添加记录——如阿里云

5. 外链域名

   - 选择已解析的外链域名，通过外链域名即可访问上传至七牛云储存空间的图片或视频

6. 获取密钥

   - 密钥和空间储存名称后端写在数据库，调接口时，返回一个七牛云的token（需要token才能读取文件）

```js
export function UploadImgToken(data) {
  return service.request({
    url: "/uploadImgToken/",
    method: "POST",
    data,
  });
}
```

```js
//获取七牛云token
uploadImgConfig: {
    action: "http://up-z2.qiniup.com",
    accesskey: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RSZTRKJj",
    secretkey: "l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboeUw",
    buckety: "webjshtml",
  },
UploadImgToken(this.uploadImgConfig).then((response) => {
    this.uploadKey.token = response.data.data.token;
  });
```

获取的token作为参数传递给el-upload组件

```html
<el-upload
  class="avatar-uploader"
  :action="uploadImgConfig.action"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :data="uploadKey"
>
  <img
    v-if="detailForm.imgUrl"
    :src="detailForm.imgUrl"
    class="avatar"
  />
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```



### 40.作用域插槽

让父组件的插槽内容能够访问子组件中的数据

1. 在子组件中将 `data` 作为 `<slot>` 元素的 attribute 绑定

   ```html
   <slot :name="item.slotName" :data="scope.row"></slot>
   ```

2. 在父组件中使用带值的 `v-slot` 来定义提供的插槽 prop 

   ```html
   <base-table>
         <!--父组件插槽内容-->
         <template v-slot:status="props">
           <el-switch v-model="props.data.status">
           </el-switch>
         </template>
   </base-table>
   ```

   



