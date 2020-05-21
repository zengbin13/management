//0.使用element的消息提示
import { Message } from "element-ui";
import { getToKen, getUserName } from "../utils/cookie";

//1.导入axios
import axios from "axios";

//2.创建实例
const BASEURL = process.env.NODE_ENV === "production" ? "http://www.web-jshtml.cn/productapi/token" : "/api";
const service = axios.create({
  baseURL: BASEURL,
  timeout: 5000,
  headers: { Accept: "application/json" },
});

//3.添加请求和响应拦截器
service.interceptors.request.use(
  (config) => {
    //请求之前的数据处理
    // 后台需要前端传相关的参数（在请求头添加参数）
    config.headers["Tokey"] = getToKen();
    config.headers["UserName"] = getUserName();
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
      // Message({
      //   showClose: true,
      //   message: data.message,
      //   type: "success",
      // });
      return response;
    }
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

//4.导出封装的axios
export default service;
