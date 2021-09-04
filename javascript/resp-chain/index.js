function normal () {
  class Handler {
    constructor (name) {
      this.name = name
      this.next = null
    }

    setNext (next) {
      this.next = next
    }

    handle (request) {
      if (this.realHandle(request)) {
        console.log('handle completed')
      } else {
        this.next.handle(request)
      }
    }

    realHandle (request) {

    }
  }

  class HanlderL1 extends Handler {
    realHandle (request) {
      console.log('L1 handler ' + this.name + ' handle the request')
      return request.level <= 5
    }
  }

  class HandlerL2 extends Handler {
    realHandle (request) {
      console.log('L2 handler ' + this.name + ' handle the request')
      return request.level > 5 && request.level <= 10
    }
  }

  class HandlerL3 extends Handler {
    realHandle (request) {
      console.log('L3 handler ' + this.name + ' handle the request')
      return true
    }
  }

  class HanlderSystem {
    constructor (names) {
      this.h1 = new HanlderL1(names[0])
      this.h2 = new HandlerL2(names[1])
      this.h3 = new HandlerL3(names[2])

      this.h1.setNext(this.h2)
      this.h2.setNext(this.h3)
    }

    handle (request) {
      this.h1.handle(request)
    }
  }

  const hs = new HanlderSystem(['t3', 't2', 't1'])
  hs.handle({
    level: 15
  })

}

module.exports = {
  normal
}