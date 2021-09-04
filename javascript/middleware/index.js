function normal () {
  function compose (middlewares) {

    return function (ctx, next) {
      let index = -1
      return dispatch(0)

      function dispatch (i) {
        index = i
        let fn = middlewares[i]

        if (i === middlewares.length) {
          fn = next
        }

        if (!fn) {
          return Promise.resolve()
        }

        try {
          return Promise.resolve(fn(ctx, function next () {
            return dispatch(i + 1)
          }))
        } catch (err) {
          return Promise.reject(err)
        }
      }

    }
  }

  function Koa () {
    this.middlewares = []
  }

  Koa.prototype.use = function (middleware) {
    this.middlewares.push(middleware)
  }

  Koa.prototype.listen = function () {
    const chain = compose(this.middlewares)
    function finalNext (ctx) {
      console.log('final')
    }
    chain(this, finalNext)
  }

  const app = new Koa()
  app.use(async (ctx, next) => {
    console.log('middleware1 start')
    await next()
    console.log('middleware1 end')
  })

  app.use(async (ctx, next) => {
    console.log('middleware2 start')
    await next()
    console.log('middleware2 end')
  })

  app.listen()
}

module.exports = {
  normal
}