
/**
 * 1、闭包的应用
 */
function memorize (fn) {
  const cache = {}
  return function (...args) {
    const key = JSON.stringify(args)

    if (cache[key] !== undefined) {
      return cache[key]
    } else {
      return cache[key] = fn.apply(fn, args)
    }
  }
}

/**
 * 2、柯里化
 */
/**
 * 简单柯里，就是把参数拆成两份
 */
function simpleCurrying (fn, ...args) {
  return (...argsX) => {
    return fn.apply(null, argsX.concat(args))
  }
}

/** 
 * 通用柯里
 * 返回一个函数不断记录用户传入的参数数量，直到最终的参数数量 >= fn需要的参数数量
 */
function currying (fn) {
  const length = fn.length
  const finalArgs = []

  return function inner (...args) {
    args.forEach(arg => {
      finalArgs.push(arg)
    })

    if (finalArgs.length >= length) {
      return fn.apply(this, finalArgs)
    } else {
      return inner
    }
  }
}

/**
 * 3、反柯里化
 * 其实就是换掉原fn里的this
 */
function unCurrying (fn) {
  return function(target, ...args) {
    return fn.apply(target, args)
  }
}

/**
 * 4、偏函数，固定某个参数后产生多个只有其他参数的函数
 */
function isType (type) {
  return obj => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  }
}

/**
 * 5、继承es5，es6比较简单，就不演示了了
 */
function extending () {
  function Rectangle (length, width) {
    this.length = length
    this.width = width
  }

  Rectangle.prototype.getArea = function () {
    return this.length * this.width
  }

  Rectangle.prototype.getPerimeter = function () {
    return (this.length + this.width) * 2
  }

  function Square (size) {
    Rectangle.call(this, size, size)
  }
  Square.prototype = Object.create(Rectangle.prototype)
  Square.prototype.getPerimeter = function () {
    return this.length * 4
  }

  const rect = new Rectangle(2, 3)
  console.log(rect.getArea(), rect.getPerimeter())
  const squa = new Square(5)
  console.log(squa.getArea(), squa.getPerimeter())
}

module.exports = {
  memorize,
  simpleCurrying,
  currying,
  unCurrying,
  isType,
  extending,
}