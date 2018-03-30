import curry from 'lodash.curry';

export default curry((defaultState, updater) => (
  (action) => (state = defaultState) => updater(action)(state)
))
