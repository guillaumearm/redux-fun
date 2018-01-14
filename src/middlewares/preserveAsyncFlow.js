const preserveAsyncSeries = require('./preserveAsyncSeries');

module.exports = (actionTypes) => {
  // eslint-disable-next-line no-console
  console.warn('redux-fun : preserveAsyncFlow is deprecated, use preserveAsyncSeries instead');
  return preserveAsyncSeries(actionTypes)
}
