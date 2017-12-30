const bindSelectors = (selectors, getState) => (
  selectors.map(selector => (...args) => selector(getState(), ...args))
)

module.exports = {
  bindSelectors,
};
