import { io, createTestHandler } from 'handle-io';

const dispatch = io(() => {});
const next = io(() => {});
const getState = io(() => {});

const createTestReduxHandler = (h, action, mockedIOs = [], expectedRetValue, assertRet = false, constructor = createTestReduxHandler) => {
  return {
    ...createTestHandler(
      h(action, { dispatch, getState, next }),
      mockedIOs,
      expectedRetValue,
      assertRet,
      (h, mockedIOs = [], expectedRetValue, assertRet = false) => (
        constructor(
          h,
          action,
          mockedIOs,
          expectedRetValue,
          assertRet,
          constructor
        )
      )
    ),
    matchDispatch: (arg, ret) => constructor(
      h,
      action,
      [...mockedIOs, [dispatch(arg), ret]],
      expectedRetValue,
      assertRet,
      constructor,
    ),
    matchNext: (arg, ret) => constructor(
      h,
      action,
      [...mockedIOs, [next(arg), ret]],
      expectedRetValue,
      assertRet,
      constructor,
    ),
    matchGetState: (ret) => constructor(
      h,
      action,
      [...mockedIOs, [getState(), ret]],
      expectedRetValue,
      assertRet,
      constructor,
    ),
  };
};

const testReduxHandler = (h, action) => createTestReduxHandler(h, action)

export default testReduxHandler;
