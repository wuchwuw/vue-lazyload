const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const { uglify } = require('rollup-plugin-uglify')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

async function build () {
  try {
    const bundle = await rollup.rollup({
      input: path.resolve(__dirname, 'src/index.js'),
      plugins: [
        resolve(),
        commonjs(),
        babel({ runtimeHelpers: true }),
        uglify()
      ]
    })
    let { output: [ { code } ] } = await bundle.generate({
      format: 'umd',
      name: 'VueLazyload'
    })
    await write(path.resolve(__dirname, 'dist/vue-lazyload.js'), code)
  } catch (e) {
    console.log(e)
  }
}

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

build()