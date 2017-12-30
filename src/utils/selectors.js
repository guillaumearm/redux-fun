const mapValues = require('lodash.mapvalues');

const bindSelectors = (selectors, getState) => (
  mapValues(selectors, (selector) => (...args) => selector(getState(), ...args))
)

module.exports = {
  bindSelectors,
};
