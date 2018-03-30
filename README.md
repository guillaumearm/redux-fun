redux-fun
===============
[![npm](https://img.shields.io/npm/v/redux-fun.svg)](https://www.npmjs.com/package/redux-fun)
[![NSP Status](https://nodesecurity.io/orgs/trapcodien/projects/b0aa847e-a5c4-4758-9aab-d4e23d15d3d1/badge)](https://nodesecurity.io/orgs/trapcodien/projects/b0aa847e-a5c4-4758-9aab-d4e23d15d3d1)
[![dependencies Status](https://david-dm.org/guillaumearm/redux-fun/status.svg)](https://david-dm.org/guillaumearm/redux-fun)
[![devDependencies Status](https://david-dm.org/guillaumearm/redux-fun/dev-status.svg)](https://david-dm.org/guillaumearm/redux-fun?type=dev)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/guillaumearm/redux-fun/blob/master/CONTRIBUTING.md)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Join the chat at https://gitter.im/redux-fun/Lobby](https://badges.gitter.im/redux-fun/Lobby.svg)](https://gitter.im/redux-fun/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Redux functional programming utilities

## Install
```bash
$ npm install --save redux-fun
```

## Documentation


### Reducers

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

----------------------

### Updaters
##### updater with initial state
```js
const { withDefaultState } = require('redux-fun');

// normal
const updater_1 = withDefaultState({}, action => state => state);

// curried
const updater_2 = withDefaultState({})(action => state => state);
```
----------------------

### Middlewares

##### Compose middlewares
```js
  const { composeMiddlewares, pipeMiddlewares } = require('redux-fun');

  const middleware_1 = composeMiddlewares(m3, m2, m1);
  const middleware_2 = pipeMiddlewares(m1, m2, m3);
```

##### Preserve async flow (deprecated)
Use preserveAsyncSeries instead

##### Preserve async series
Respect the dispatch order with async middleware
```js
  const { preserveAsyncSeries } = require('redux-fun');
  const middleware_1 = preserveAsyncSeries('ACTION_TYPE')
  const middleware_2 = preserveAsyncSeries(['ACTION_TYPE_1', 'ACTION_TYPE_2'])
```
----------------------

### Handlers
A [Handler](https://github.com/guillaumearm/handle-io/#handlers) from the [handle-io](https://github.com/guillaumearm/handle-io) library can be tranformed into redux middleware using [createHandleIOMiddleware](https://github.com/guillaumearm/redux-fun#createhandleiomiddleware) function.

#### Redux Handlers

A `redux handler` run every time an action was dispatched.

It takes two arguments:
- **action**
- **reduxHandleIOApi**



The **reduxHandleIOApi** object provides 3 [IOs](https://github.com/guillaumearm/handle-io/#io) functions :
- **getState**
- **dispatch**
- **next**

Please see [handle-io documentation](https://github.com/guillaumearm/handle-io/#readme) for more details.

**e.g.**

```js
const { io, handler } = require('handle-io');

const sleep = io(s => new Promise(resolve => setTimeout(resolve, s * 1000)));

// delayed action example
const myHandler1 = handler(function*(action, { next }) {
  yield sleep(1);
  return yield next(action);
});

// preserve dispatch order
const myHandler2 = handler(function*(action, { next, dispatch }) {
  const nexted = yield next(action);
  yield dispatch({ type: 'DUMMY_ACTION' });
  return nexted;
});

// print state
const log = io(console.log);
const myHandler3 = handler(function*(action, { next, getState }) {
  const nexted = yield next(action);
  const state = yield getState();
  yield log(state);
  return nexted;
})
```

**Note:** A `redux handler` acts as an async middleware.

#### testReduxHandler

`testReduxHandler` is an extension of [handle-io#testHandler](https://github.com/guillaumearm/handle-io/#test-side-effects-orchestration-without-pain)

it adds 3 **match\*()** methods:
- **.matchNext()** - 2 arguments:
  - next argument **(assert)**
  - next return **(mock)**
- **.matchDispatch()** - 2 arguments:
  - dispatch argument **(assert)**
  - dispatch return **(mock)**
- **.matchGetState()** - 1 argument:
  - getState return **(mock)**

**e.g.**
```js
const { handler } = require('handle-io');
const { testReduxHandler } = require('redux-fun');

const createDummyAction = (payload) => { type: 'DUMMY_ACTION', payload }
const myAction = { type: 'MY_ACTION', payload: {} };

const myHandler4 = handler(function*(action, { dispatch, getState, next }) {
  const { value } = yield getState();
  yield dispatch(createDummyAction(value));
  return yield next(myAction);
})

testReduxHandler(myHandler4, myAction)
  .matchGetState({ value: 42 })
  .matchDispatch(createDummyAction(42))
  .matchNext(myAction, 'returned value')
  .shouldReturn('returned value')
  .run()
```

#### createHandleIOMiddleware

**usage:**
```js
const { createHandleIOMiddleware } = require('redux-fun');
const handleIOMiddleware = createHandleIOMiddleware(myHandler1, myHandler2, myHandler3, myHandler4)
```

----------------------
### Selectors

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

##### getOwnProp

`getOwnProp` is very useful to use with createSelector from [reselect](https://github.com/reactjs/reselect)

```js
const { createSelector } = require('reselect');
const { getOwnProp } = require('redux-fun');

const getUsers = (state = {}) => state.users || {}

const getUserByName = createSelector(
  getUsers,
  getOwnProp('fullName'),
  (users, fullName) => users[fullName]
)

getUserByName({ users: { user1: true } }, { fullName: 'user1' }); // => true
```
----------------------
