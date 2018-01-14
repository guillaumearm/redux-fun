const pipeReducers = (reducer, ...restReducers) => (state, action) => {
  if (typeof reducer !== 'function') {
    throw new Error('pipeReducers - a reducer must be a function')
  }
  if (restReducers.length === 0) {
    return reducer(state, action);
  }
  return pipeReducers(...restReducers)(reducer(state, action), action)
}

module.exports = pipeReducers
