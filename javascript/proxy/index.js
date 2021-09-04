function normal () {
  class Target {
    execute () {

    }
  }

  class TargetImpl extends Target {
    execute() {
      console.log('real target execute')
    }
  }

  class Proxy extends Target {
    constructor (target) {
      super()
      this.target = target
    }

    execute () {
      console.log('hooked')
      this.target.execute()
    }
  }

  const t = new TargetImpl()
  const proxy = new Proxy(t)
  proxy.execute()
}

function jsProxy () {
  const ref = obj => {
    return new Proxy(obj, {
      get (target, key) {
        if (key === 'name') {
          console.log('lalala')
        }
        return target[key]
      },

      set (target, key, value) {
        target[key] = value
      }
    })
  }

  const personOrigin = {
    name: 't',
    age: 10,
    print () {
      console.log('name is ' + this.name + ', age ' + this.age)
    },
  }
  const personProxy = ref(personOrigin)
  
  personOrigin.print()
  personProxy.print()

  personProxy.name = 'tp'
  personProxy.age = 20

  personOrigin.print()
  personProxy.print()
}

function customProxy () {
  function ProxyX (target, handler) {
    function _deepClone (obj) {
      const clone = {}

      Object.keys(obj).forEach(key => {
        const value = obj[key]
        if (typeof value === 'object') {
          clone[key] = _deepClone(value)
        } else {
          clone[key] = value
        }
      })

      return clone
    }

    const targetProxy = _deepClone(target)

    Object.keys(targetProxy).forEach(key => {
      Object.defineProperty(targetProxy, key, {
        set (value) {
          handler.set && handler.set(target, key, value)
        },

        get () {
          return handler.get && handler.get(target, key)
        }
      })
    })

    return targetProxy
  }

  const p = new ProxyX({ 
    name: 't',
    info: {
      age: 10,
      sex: 'male'
    }
  }, {
    set (target, key, value) {
      console.log('set proxy')
      target[key] = value
    },

    get (target, key) {
      console.log('get proxy')
      return target[key]
    }
  })

  console.log(p.name)
  p.name = 'tx'
  console.log(p.name)
}

module.exports = {
  normal,
  jsProxy,
  customProxy,
}