import service from "../utils/request";

// 接口名称：获取信息列表
export function GetInfoList(data) {
  return service.request({
    url: "/news/getList/",
    method: "POST",
    data,
  });
}

// 接口名称：获取信息分类
export function GetCategoryAll() {
  return service.request({
    url: "/news/getCategoryAll/",
    method: "POST",
  });
}

// 接口名称：信息分类添加一级
export function AddFirstCategory(data) {
  return service.request({
    url: "/news/addFirstCategory/",
    method: "POST",
    data
  });
}

// 接口名称：信息分类添加子级
export function AddChildrenCategory(data) {
  return service.request({
    url: "/news/addChildrenCategory/",
    method: "POST",
    data
  });
}

// 接口名称：删除信息分类
export function DeleteCategory(data) {
  return service.request({
    url: "/news/deleteCategory/",
    method: "POST",
    data
  });
}

// 接口名称：修改信息分类 
export function EditCategory(data) {
  return service.request({
    url: "/news/editCategory/",
    method: "POST",
    data
  });
}