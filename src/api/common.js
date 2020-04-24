import service from "../utils/request";

// 获取七牛云token
export function UploadImgToken(data) {
  return service.request({
    url: "/uploadImgToken/",
    method: "POST",
    data,
  });
}
