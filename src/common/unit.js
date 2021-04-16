//防抖动
export function debounce(fnc, wait) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fnc.apply(this, args)
    }, wait)
  }
}
