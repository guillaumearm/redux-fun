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

export default pipeMiddlewares
