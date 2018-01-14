module.exports = (...middlewares) => require('./pipeMiddlewares')(...middlewares.reverse())
