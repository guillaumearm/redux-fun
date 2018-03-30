export default (actionType = []) => () => (next) => {
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
      let nexted;
      let error;
      try {
        nexted = await next(action);
      } catch (e) {
        error = e;
      }
      dispatching = false;
      const nextAction = queue.shift();
      if (nextAction) {
        nextAction.resume();
      }
      if (error) {
        throw error;
      }
      return nexted;
    }
    return await next(action);
  }
}
