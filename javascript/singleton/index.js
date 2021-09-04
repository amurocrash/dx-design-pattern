function normal () {

  function Person (name, age) {
    if (Person._instance) {
      return Person._instance
    }

    Person._instance = this
    this.name = name
    this.age = age
  }

  Person.prototype.print = function () {
    console.log(`Person's name is ${this.name}, age is ${this.age}`)
  }

  const p1 = new Person('p1', 10)
  const p2 = new Person('p2', 20)

  console.log(p1 === p2)
  p1.print()
}

/**
 * 隐藏_instance实例，防止被修改
 */
function common () {
  const Person = function () {
    let _instance

    return function (name, age) {
      if (_instance) {
        return _instance
      }

      _instance = this
      this.name = name
      this.age = age 
    }
  }()

  Person.prototype.print = function () {
    console.log(`Person's name is ${this.name}, age is ${this.age}`)
  }

  const p1 = new Person('p1', 10)
  const p2 = new Person('p2', 20)
  console.log(p1 === p2)
  p2.print()
}

function commonES6 () {
  // 对比java真是一言难尽
  let _instance
  class Person {
    constructor (name, age) {
      if (_instance) {
        return _instance
      }

      _instance = this
      this.name = name
      this.age = age
    }

    print () {
      console.log(`Person's name is ${this.name}, age is ${this.age}`)
    }
  }

  const p1 = new Person('p1', 10)
  const p2 = new Person('p2', 10)
  console.log(p1 === p2)
  p2.print()
}

/**
 * 把一个非单例对象变成单例
 */
function proxyES5 () {

  const Singleton = function (Constructor) {
    let _instance

    const Proxy = function (...args) {
      if (_instance) {
        return _instance
      }

      return _instance = new Constructor(...args)
    }

    return Proxy
  }

  function Person (name, age) {
    this.name = name
    this.age = age
  }
  
  Person.prototype.print = function () {
    console.log(`Person's name is ${this.name}, age is ${this.age}`)
  }

  const PersonSingleton = Singleton(Person)
  const p1 = new PersonSingleton('p1', 10)
  const p2 = new PersonSingleton('p2', 20)

  console.log(p1 === p2)
  p2.print()
}

function proxyES6 () {

  function Singleton (Class) {
    let _instance
    return new Proxy(Class, {
      construct(target, args) {
        return _instance || (_instance = new Class(...args))
      }
    })
  }

  class Person {
    constructor(name) {
      this.name = name
    }
  }

  const PersonSingleton = Singleton(Person)
  const p1 = new PersonSingleton('p1')
  const p2 = new PersonSingleton('p2')
  console.log(p1 === p2)
  console.log(p2.name)
}

module.exports = {
  normal,
  common,
  commonES6,
  proxyES5,
  proxyES6,
}