function normal () {
  function compose () {
    
  }

  function Koa () {
    this.middlewares = []
  }

  Koa.prototype.use = function (middleware) {
    this.middlewares.push(middleware)
  }

  Koa.prototype.listen = function () {

  }

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
}