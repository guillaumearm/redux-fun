module.exports = {
  ...require('./reducers'),
  ...require('./updaters'),
  ...require('./middlewares'),
  ...require('./handlers'),
  ...require('./selectors'),
};
