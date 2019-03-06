export function throttle (fn, time) {
  let prev = 0
  let timer = null
  return function () {
    let now = Date.now()
    if (timer) {
      return
    }
    if (now - prev >= time) {
      fn.apply(this)
      timer = null
      prev = Date.now()
    } else {
      timer = setTimeout(() => {
        fn.apply(this)
        timer = null
        prev = Date.now()
      }, time)
    }
  }
}

