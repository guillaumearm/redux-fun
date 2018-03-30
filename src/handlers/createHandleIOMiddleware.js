import { io } from 'handle-io';
import pipeMiddlewares from '../middlewares/pipeMiddlewares';


const convertHandlerToMiddleware = h => ({ dispatch, getState }) => next => {
  const reduxHandleIOApi = {
    dispatch: io(dispatch),
    getState: io(getState),
    next: io(next),
  }
  return action => h(action, reduxHandleIOApi).run();
};

const createHandleIOMiddleware = (...handlers) => {
  const middlewares = handlers.map(convertHandlerToMiddleware);
  return pipeMiddlewares(...middlewares);
};

export default createHandleIOMiddleware;
