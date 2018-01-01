const simpleComposeMiddlewares = (m1, m2) => store => next => (
  m2(store)(m1(store)(next))
);

const pipeMiddlewares = (...middlewares) => {
  const [m1, m2, ...rest] = middlewares;
  if (!m1) {
    throw new Error('pipeMiddlewares should have at least one middleware in argument');
  }
  if (!m2) {
    return m1;
  }
  return pipeMiddlewares(simpleComposeMiddlewares(m2, m1), ...rest);
};

const composeMiddlewares = (...middlewares) => pipeMiddlewares(...middlewares.reverse())

const preserveAsyncFlow = (actionType = []) => () => (next) => {
  const actionsTypes = typeof actionType === 'string' ? [actionType] : actionType;
  const queue = [];
  let dispatching = false;
  return async function scheduler(action) {
    if (actionsTypes.find(type => type === action.type)) {
      if (dispatching) {
        await new Promise(resolve => {
          queue.push({ resume: resolve })
        })
        return await scheduler(action);
      }
      dispatching = true;
      const nexted = await next(action);
      dispatching = false;
      const nextAction = queue.shift();
      if (nextAction) {
        nextAction.resume();
      }
      return nexted;
    }
    return await next(action);
  }
}

module.exports = {
  pipeMiddlewares,
  composeMiddlewares,
  preserveAsyncFlow,
}
