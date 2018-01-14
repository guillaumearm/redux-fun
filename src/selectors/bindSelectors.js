const mapValues = require('lodash.mapvalues');

module.exports = (selectors, getState) => (
  mapValues(selectors, (selector) => (
    (...args) => selector(getState(), ...args)
  ))
)
