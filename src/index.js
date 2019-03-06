import LazyClass from './lazy.js'

export default {
  install (Vue, options = {}) {
    const lazyClass = new LazyClass(Vue)
    const lazy = new lazyClass(options)

    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy),
      update: lazy.update.bind(lazy),
      componentUpdated: lazy.handleImageLoad.bind(lazy),
      unbind: lazy.remove.bind(lazy)
    })
  }
}
