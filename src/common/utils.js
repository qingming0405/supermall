// 防抖函数：延迟频繁执行的函数
export function debounce(func, delay){
  let timer = null
  return function(...args){
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}