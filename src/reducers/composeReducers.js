module.exports = (...reducers) => require('./pipeReducers')(...reducers.reverse())
