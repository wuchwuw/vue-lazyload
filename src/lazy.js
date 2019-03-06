import Listener from './listener'
import { throttle } from './util'

export default function (Vue) {
  return class LazyClass {
    constructor (options) {
      this.listenerList = []
      this.handleImageLoad = throttle(this.handleImageLoad.bind(this), 300)
      this.initEvent()
    }

    initEvent () {
      window.addEventListener('scroll', this.handleImageLoad)
    }

    add (el, binding, vnode) {
      const listener = new Listener({
        el,
        src: binding.value
      })
      this.listenerList.push(listener)
      Vue.nextTick(() => {
        this.handleImageLoad()
      })
    }

    update () {}

    remove () {}

    handleImageLoad () {
      let i = this.listenerList.length
      while (i--) {
        let listener = this.listenerList[i]
        if (listener.loaded) break
        if (listener.checkInView()) {
          listener.load()
        }
      }
    }
  }
}
