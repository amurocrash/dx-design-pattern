function normal () {
  const EventBus = (function () {

    const eventMap = {}

    return {
      on (eventName, cb) {
        let hanlderArr = eventMap[eventName]
        if (!hanlderArr) {
          handlerArr = eventMap[eventName] = []
        }

        if (!handlerArr.find(handler => handler === cb)) {
          handlerArr.push(cb)
        }
      },

      emit (eventName, data) {
        const handlerArr = eventMap[eventName]
        if (handlerArr) {
          handlerArr.forEach(hanlder => {
            hanlder.call(null, data)
          })
        }
      },

      off (eventName, cb) {
        const handlerArr = eventMap[eventName]
        if (handlerArr) {
          const index = handlerArr.indexOf(cb)
          handlerArr.splice(index, 1)
        }
      }
    }
  }())

  EventBus.on('click', data => {
    console.log(data.msg)
  })

  const cb = data => {
    console.log(data.msg + '1')
  }
  EventBus.on('click', cb)

  EventBus.on('click', data => {
    console.log(data.msg + '2')
  })

  EventBus.emit('click', {
    msg: 'hello'
  })

  EventBus.off('click', cb)

  EventBus.emit('click', { 
    msg: 'hellox '
  })
}

module.exports = {
  normal
}