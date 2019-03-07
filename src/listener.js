export default class Listener {
  constructor ({ src, el, defaultSrc }) {
    this.src = src
    this.el = el
    this.default = defaultSrc
    this.status = 'loading'  // loading error loaded
    this.render('loading')
  }

  getRect () {
    return this.el.getBoundingClientRect()
  }

  checkInView () {
    let dist = this.getRect()
    return (window.innerHeight > dist.top && dist.bottom > 0) && (window.innerWidth > dist.left && dist.right > 0)
  }

  load (cb) {
    loadImage(this.src, (src) => {
      this.status = 'loaded'
      this.render('loaded')
    }, (e) => {
      this.status = 'error'
      this.render('error')
      console.log(`${this.src} falid`)
    })
  }

  render (state) {
    let src
    switch (state) {
      case 'loading':
      case 'error':
        src = this.default
        break
      case 'loaded':
        src = this.src
        break
    }
    this.el.setAttribute('src', src)
  }
}

function loadImage (src, resolve, reject) {
  let image = new Image()
  image.src = src
  image.onload = () => {
    resolve(src)
  }
  image.onerror = (e) => {
    reject(e)
  }
}
