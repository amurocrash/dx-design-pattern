function normal () {
  class Target {
    run () {
      console.log('target run')
    }
  }

  class Decorator extends Target {
    constructor (target) {
      super()
      this.target = target 
    }

    run () {
      console.log('decor something')
      this.target.run()
    }
  }

  class DecoratorX extends Target {
    constructor (target) {
      super()
      this.target = target
    }

    run () {
      console.log('decorX something')
      this.target.run()
    }
  }

  const t = new Target()
  const dt = new Decorator(t)
  const dtx = new DecoratorX(dt)
  dt.run()
  dtx.run()
}

function jsDecor () {
  const w = {
    onload () {
      console.log('1')
    }
  }

  w.onload()

  function decorFn (obj, key, fn) {
    const originFn = obj[key]
    obj[key] = function () {
      originFn()
      fn()
    }
  }

  decorFn (w, 'onload', function () {
    console.log('2')
  })

  w.onload()
}

module.exports = {
  normal,
  jsDecor
}