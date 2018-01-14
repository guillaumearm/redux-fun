const curry = require('lodash.curry')

module.exports = curry((defaultState, updater) => (
  (action) => (state = defaultState) => updater(action)(state)
))
