const curry = require('lodash.curry')

const withDefaultState = curry((defaultState, updater) => (
  (action) => (state = defaultState) => updater(action)(state)
))

module.exports = {
  withDefaultState,
}
