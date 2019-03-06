export default class Listener {
  constructor ({ src, el }) {
    this.src = src
    this.el = el
    this.loaded = false
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
      this.loaded = true
      this.el.setAttribute('src', src)
    }, (e) => {
      console.log(`${this.src} falid`)
    })
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
