redux-fun
===============

Redux functional programming utilities

## Install
```bash
$ npm install --save redux-fun
```

## Documentation


### Reducers
----------------------

##### Compose reducers
```js
  const { composeReducers, pipeReducers } = require('redux-fun');

  const reducer_1 = composeReducers(r3, r2, r1);
  const reducer_2 = pipeReducers(r1, r2, r3);
```

##### Convert updaters
```js
const { toReducer } = require('redux-fun');
const updater = (action) => state => state;
const reducer = toReducer(updater);
```

### Updaters
----------------------
##### updater with initial state
```js
const { withDefaultState } = require('redux-fun');

// normal
const updater_1 = withDefaultState({}, action => state => state);

// curried
const updater_2 = withDefaultState({})(action => state => state);
```

### Middlewares
----------------------

##### Compose middlewares
```js
  const { composeMiddlewares, pipeMiddlewares } = require('redux-fun');

  const middleware_1 = composeMiddl(m3, m2, m1);
  const middleware_2 = pipeMiddlewares(m1, m2, m3);
```

### Selectors
----------------------

##### Bind selectors

```js
  const { bindSelectors } = require('redux-fun');

  const selectors = {
    getUsers: (state) => state.users,
    getUser: (state, { id }) => state.users[id],
  }

  const boundSelectors = bindSelectors(selectors, store.getState);
  const user = boundSelectors.getUser({ id: 1 });
```
