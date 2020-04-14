//1.设计稿1rem的宽度
const baseSize = 16;
//2.setrem 函数
function setRem() {
  //2.1获取浏览器的窗口宽度
  const htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  //2.2 实际设备页面宽度和 设计稿 的比值
  const scale = htmlWidth / 1536;
  //2.3设置根元素字体大小
  document.querySelector("html").style.fontSize = baseSize * scale + "px";
}
//3.初始化
setRem();
//4.监听浏览器窗口变化
window.addEventListener("resize", () => {
  setRem();
});
