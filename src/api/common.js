import service from "../utils/request";

// 获取七牛云token
export function UploadImgToken(data) {
  return service.request({
    url: "/uploadImgToken/",
    method: "POST",
    data,
  });
}

// 请求表格数据
export function LoadTableData(params) {
  return service.request({
    method: params.method || "post",
    url: params.url,
    data: params.data || {},
  });
}

// 接口名称：获取省、市、区
export function GetCityNames(data) {
  return service.request({
    url: "/cityPicker/",
    method: "POST",
    data,
  });
}
