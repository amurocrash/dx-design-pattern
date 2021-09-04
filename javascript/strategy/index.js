/**
 * discount example
 */
function bad () {
  function priceCalculate (type, originPrice) {
    if (type === 'on100_30') {
      return originPrice - Math.floor(originPrice / 100) * 30
    } else if (type === 'percent80') {
      return originPrice * 0.8
    } else {
      return originPrice
    }
  }

  console.log(priceCalculate('percent80', 100))
}

function withPattern1 () {
  const priceHandler = {
    on100_30 (originPrice) {
      return originPrice - Math.floor(originPrice / 100) * 30
    },

    percent80 (originPrice) {
      return originPrice * 0.8
    },

    normal (originPrice) {
      return originPrice
    }
  }

  function priceCalculate (type, originPrice) {
    const realType = type ? type : 'normal'
    return priceHandler[realType].call(null, originPrice)
  }

  console.log(priceCalculate('percent80', 100))
}

function withPattern2 () {
  const priceHandler = function() {
    const discountMap = {
      on100_30 (originPrice) {
        return originPrice - Math.floor(originPrice / 100) * 30
      },
  
      percent80 (originPrice) {
        return originPrice * 0.8
      },
  
      normal (originPrice) {
        return originPrice
      }
    }

    return {
      getPrice (type, originPrice) {
        if (!type) {
          type = 'normal'
        }

        return discountMap[type].call(null, originPrice)
      },

      addDiscount (key, fn) {
        discountMap[key] = fn
      }
    }
  }()

  function priceCalculate (type, price) {
    return priceHandler.getPrice(type, price)
  }

  console.log(priceCalculate('percent80', 100))
  priceHandler.addDiscount('percent70', (originPrice) => {
    return originPrice * 0.7
  })
  console.log(priceCalculate('percent70', 100))

}

/**
 * classic strategy implementation
 */
const Strategy = {}
const context = (type, ...args) => {
  return Strategy[type] && Strategy[type](...args)
}

/**
 * 
 */
function validateExample () {
  const validates = {
    username (str) {
      const reg = /^[\u4e00-\u9fa5]{2,10}$/
      return reg.test(str)
    },

    phoneNumber (str) {
      const reg = /^1\d{10}$/
      return reg.test(str)
    },

    email () {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      return reg.test(str)
    }
  }

  const genValidate = (key) => (str) => validates[key] && validates[key](str)

  const usernameValidator = genValidate('username')
  console.log(usernameValidator('测试'))
}


module.exports = {
  bad,
  withPattern1,
  withPattern2,
  validateExample
}