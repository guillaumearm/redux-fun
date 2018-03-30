import mapValues from 'lodash.mapvalues';

export default (selectors, getState) => (
  mapValues(selectors, (selector) => (
    (...args) => selector(getState(), ...args)
  ))
)
