import service from "../utils/request";

//接口名称：登录获取验证码
export function GetCheckCode(data) {
  return service.request({
    url: "/getSms/",
    method: "POST",
    data
  });
}

//接口名称：注册
export function Register(data) {
  return service.request({
    url: "/register/",
    method: "POST",
    data
  });
}

//接口名称：登录
export function Login(data) {
  return service.request({
    url: "/login/",
    method: "POST",
    data
  });
}
