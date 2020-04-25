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
