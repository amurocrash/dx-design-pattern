function normal () {
  function forEach (obj, cb) {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        cb.call(obj, obj[i], i, obj)
      }
    } else {
      const keys = Object.keys(obj)
      for (let i = 0; i< keys.length; i++) {
        const key = keys[i]
        const value = obj[key]
        cb.call(obj, { key, value })
      }
    }
  }

  forEach([1, 2, 3], (e, index, arr) => {
    console.log(e)
  })

  forEach({ title: 'hello', msg: 'world'}, entry => {
    console.log(entry)
  })
}

module.exports = {
  normal
}