const { memorize, simpleCurrying, currying, unCurrying, isType, extending } = require('./basic')
const { normal, common, commonES6, proxyES5, proxyES6 } = require('./singleton')
const factory = require('./factory')
const builder = require('./builder')
const proxy = require('./proxy')
const flyweight = require('./flyweight')
const adapter = require('./adapter')
const decorator = require('./decorator')
const composite = require('./composite')
const bridge = require('./bridge')
const observer = require('./observer')
const state = require('./state')
const tempalte = require('./template')
const iterator = require('./iterator')
const command = require('./command')
const respChain = require('./resp-chain')
const { bad, withPattern1, withPattern2, validateExample } = require('./strategy')

function basicTest () {
  function memorizeTest () {
    function add (a) {
      return a + 1
    }
  
    const addMem = memorize(add)
  
    console.log(addMem(1))
    console.log(addMem(1))
  }

  function curryingTest () {
    const add = (a, b, c) => {
      return a + b + c
    }

    // const addCurrying1 = simpleCurrying(add, 1)
    // console.log(addCurrying1(2, 3))

    const addCurrying = currying(add)
    // console.log(addCurrying(1, 2, 6))
    // console.log(addCurrying(2, 3)(10))
    console.log(addCurrying(1)(2)(3))
  }

  function unCurryingTest () {
    const obj1 = {
      name: 'hello',
      print () {
        console.log(this.name)
      },
    }

    const obj2 = {
      name: 'welcome'
    }

    const print = unCurrying(obj1.print)
    print(obj2)

    const push = unCurrying(Array.prototype.push)
    push(obj1, 1)
    console.log(obj1[0])
  }

  function isTypeTest () {
    const isString = isType('String')
    const isFunction = isType('Function')

    console.log(isString('hello'))
    console.log(isFunction(isFunction))
  }

  function extendingTest () {
    extending()
  }

  extendingTest()
}

function singletonTest () {
  // normal()
  // common()
  commonES6()
  // proxyES5()
  // proxyES6()
}

function factoryTest () {
  // factory.normal()
  factory.abstract()
}

function builderTest () {
  builder.normal()
}

function proxyTest () {
  // proxy.normal()
  proxy.customProxy()
}

function flyweightTest () {
  flyweight.normal()
}

function adapterTest () {
  adapter.normal()
}

function decoratorTest () {
  // decorator.normal()
  decorator.jsDecor()
}

function compositeTest () {
  composite.file()
}

function bridgeTest () {
  bridge.normal()
}

function observerTest () {
  observer.normal()
}

function strategyTest () {
  bad()
  withPattern1()
  withPattern2()
  validateExample()
}

function stateTest () {
  state.elevator()
}

function templateTest () {
  tempalte.vue()
}

function iteratorTest () {
  iterator.normal()
}

function commandTest () {
  command.normal()
}

function respChainTest () {
  respChain.normal()
}

void function () {
  respChainTest()
}()