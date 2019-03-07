import Listener from './listener'
import { throttle, remove, find } from './util'

const DEFAULT = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

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
        src: binding.value,
        defaultSrc: DEFAULT
      })
      this.listenerList.push(listener)
      Vue.nextTick(() => {
        this.handleImageLoad()
      })
    }

    update (el, binding, vnode, oldvnode) {
      if (!el) return
      const newSrc = binding.value
      let item = find(this.listenerList, item => el === item.el)
      if (item && item.src !== newSrc) {
        item.update(newSrc)
      }
      Vue.nextTick(() => {
        this.handleImageLoad()
      })
    }

    remove (el) {
      if (!el) return
      let item = find(this.listenerList, item => item.el === el)
      if (item) {
        remove(this.listenerList, item)
        item = null
      }
    }

    handleImageLoad () {
      let free = []
      let i = this.listenerList.length
      while (i--) {
        let listener = this.listenerList[i]
        if (listener.status === 'loaded') {
          free.push(listener)
          break
        }
        if (listener.checkInView()) {
          listener.load()
        }
      }
      free.length && free.forEach(item => remove(this.listenerList, item))
    }
  }
}
