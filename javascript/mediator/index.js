function normal () {
  class Mediator {
    constructor () {
      this.colleagues = []
    }

    addCollegue (colleague) {
      if (!this.colleagues.includes(colleague)) {
        this.colleagues.push(colleague)
      }
    }

    sendMessage (msg, options) {
      const receiver = options.receiver
      const colleague = this.colleagues.find(colleague => colleague.name = receiver)
      if (colleague) {
        colleague.onMsg(msg, options.sender)
      }
    }
  }

  class Colleague {
    constructor (name, mediator) {
      this.name = name
      this.mediator = mediator
    }

    sendMessage (msg, receiver) {
      this.mediator.sendMessage(msg, { receiver, sender: this.name })
    }

    onMsg (msg, sender) {
      console.log(this.name + ' received the msg from ' + sender + ', msg is: ' + msg)
    }
  }

  const mediator = new Mediator()
  const c1 = new Colleague('c1', mediator)
  const c2 = new Colleague('c2', mediator)
  const c3 = new Colleague('c3', mediator)
  mediator.addCollegue(c1)
  mediator.addCollegue(c2)
  mediator.addCollegue(c3)

  c1.sendMessage('hello', 'c2')
}

module.exports = {
  normal
}