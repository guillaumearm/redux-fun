import pipeMiddlewares from './pipeMiddlewares';

export default (...middlewares) => pipeMiddlewares(...middlewares.reverse())
