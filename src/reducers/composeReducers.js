import pipeReducers from './pipeReducers';

export default (...reducers) => pipeReducers(...reducers.reverse())
