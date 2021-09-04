function normal () {

  class Product {
    setPartA (part) {
      this.partA = part
    }

    setPartB (part) {
      this.partB = part
    }

    setPartC (part) {
      this.partC = part
    }

    print () {
      console.log('Product is built with ' + this.partA + ', ' + this.partB + ', ' + this.partC)
    }

  }

  class Builder {
    constructor() {
      this.product = new Product()
    }

    buildPartA (pa) {
      this.product.setPartA(pa)
    }

    buildPartB (pb) {
      this.product.setPartB(pb)
    }

    buildPartC (pc) {
      this.product.setPartC(pc)
    }

    create () {
      return this.product
    }
  }

  class Director {
    constructor (builder) {
      if (!builder) {
        this.builder = new Builder()
      } else {
        this.builder = builder
      }
    }

    create (pa, pb, pc) {
      this.builder.buildPartA(pa)
      this.builder.buildPartB(pb)
      this.builder.buildPartC(pc)
      return this.builder.create()
    }
  }

  const d = new Director()
  const p = d.create('hello', 'world', 'js')
  p.print()
}

function chain () {
  class Product {
    setP1 (p1) {
      this.p1 = p1
      return this
    }

    setP2 (p2) {
      this.p2 = p2
      return this
    }

    setP3 (p3) {
      this.p3 = p3
      return this
    }

    setP4 (p4) {
      this.p4 = p4
      return this
    }

    print() {
      console.log(this.p1 + ', ' + this.p2 + ', ' + this.p3 + ', ' + this.p4)
    }
  }

  const p = new Product().setP1(1).setP2(2).setP3(3).setP4(4)
  p.print()
}

module.exports = {
  normal,
  chain
}