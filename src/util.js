export function throttle (fn, time) {
  let prev = 0
  let timer = null
  return function () {
    let now = Date.now()
    if (timer) {
      return
    }
    let context = this
    let args = arguments
    function runFn () {
      fn.apply(context, args)
      timer = null
      prev = Date.now()
    }
    if (now - prev >= time) {
      runFn()
    } else {
      timer = setTimeout(runFn, time)
    }
  }
}

export function find (arr, fn) {
  if (!arr.length) return
  const item = arr.find(fn)
  return item
}

export function remove (arr, item) {
  if (!arr.length) return
  const index = arr.indexOf(item)
  if (index > -1) {
    return arr.splice(index, 1)
  }
}
