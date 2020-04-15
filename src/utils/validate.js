// 过滤特殊字符串
export function stripscript(str) {
  let pattern = new RegExp(
    "[`~ !@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&%;—|{}【】‘；：”“'。，、？]"
  );
  let resultStr = "";
  for (const value of str) {
    resultStr = resultStr + value.replace(pattern, "");
  }
  return resultStr;
}

//验证邮箱格式
export function validateMailFormat(str) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(str);
}

//验证密码格式
export function validatePassFormat(str) {
  let reg = /^(?!\D+$)(?![ ^a-zA-Z]+$)\S{6,20}$/;
  return reg.test(str);
}

//验证验证码格式
export function validateCodeFormat(str) {
  let reg = /^[a-z0-9]{6}$/
  return reg.test(str);
}