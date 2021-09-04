function normal () {

  class Factory {
    static getInstance (type) {
      if (type === 1) {
        return new Product1()
      } else {
        return new Product2()
      }
    }
  }

  class Product {
    constructor () {
      if (new.target === Product) {
        throw new Error(`Product can't be implemetation`)
      }
    }

    operate () {
      throw new Error(`Product's method can't be invoked`)
    }
  }

  class Product1 extends Product {
    operate () {
      console.log('p1 operate')
    }
  }

  class Product2 extends Product {
    operate () {
      console.log('p2 operate')
    }
  }

  const p1 = Factory.getInstance(1)
  p1.operate()
  const p2 = Factory.getInstance(2)
  p2.operate()
}

/**
 * Vue源码示例
  export default class VueRouter {
    constructor(options) {
        this.mode = mode	// 路由模式
        
        switch (mode) {           // 简单工厂
            case 'history':       // history 方式
                this.history = new HTML5History(this, options.base)
                break
            case 'hash':          // hash 方式
                this.history = new HashHistory(this, options.base, this.fallback)
                break
            case 'abstract':      // abstract 方式
                this.history = new AbstractHistory(this, options.base)
                break
            default:
                // ... 初始化失败报错
        }
    }
  }
 */

/**
 * 不同工厂产出不同的产品系列，且工厂具有抽象特性，过于复杂，用得不多
 * 
 *               <- p11
 *   <- f1 -> p1
 *               <- p12
 * f
 *               <- p21      
 *   <- f2 -> p2
 *               <- p22
 */
function abstract () {
  class FactoryMaker {
    static getImpl (type) {
      if (type === 1) {
        return new Factory1()
      } else {
        return new Factory2()
      }
    }
  }

  class Factory {
    constructor () {
      if (new.target === Factory) {
        throw new Error(`Product can't be implemetation`)
      }
    }

    getProduct () {
      throw new Error(`Product's method can't be invoked`)
    }
  }

  class Factory1 extends Factory {
    getProduct (type) {
      if (type === 1) {
        return new Product1Impl1()
      } else {
        return new Product1Impl2()
      }
    }
  }

  class Product1 {
    constructor () {
      if (new.target === Product1) {
        throw new Error(`Product can't be implemetation`)
      }
    }

    operate () {
      throw new Error(`Product's method can't be invoked`)
    }
  }

  class Product1Impl1 extends Product1 {
    operate () {
      console.log('p11 operate')
    }
  }

  class Product1Impl2 extends Product1 {
    operate () {
      console.log('p12 operate')
    }
  }

  class Factory2 extends Factory {
    getProduct (type) {
      if (type === 1) {
        return new Product2Impl1()
      } else {
        return new Product2Impl2()
      }
    }
  }

  class Product2 {
    constructor () {
      if (new.target === Product2) {
        throw new Error(`Product can't be implemetation`)
      }
    }

    run () {
      throw new Error(`Product's method can't be invoked`)
    }
  }

  class Product2Impl1 extends Product2 {
    run () {
      console.log('p21 run')
    }
  }

  class Product2Impl2 extends Product2 {
    run () {
      console.log('p22 run')
    }
  }
  
  const f1 = FactoryMaker.getImpl(1)
  const p1 = f1.getProduct(1)
  const p2 = f1.getProduct(2)
  p1.operate()
  p2.operate()

  const f2 = FactoryMaker.getImpl(2)
  const p3 = f2.getProduct(1)
  const p4 = f2.getProduct(2)
  p3.run()
  p4.run()
}

module.exports = {
  normal,
  abstract
}
