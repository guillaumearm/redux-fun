const { io, handler } = require('handle-io');
const { testReduxHandler } = require('../..')

describe('redux-fun:handlers/testReduxHandler', () => {
  describe('readme examples', () => {
    describe('myHandler1', () => {
      const sleep = io(s => new Promise(resolve => setTimeout(resolve, s * 1000)));
      const myHandler1 = handler(function*(action, { next }) {
        yield sleep(1);
        return yield next(action);
      });

      describe('successful', () => {
        test('with shouldReturn in first', () => {
          testReduxHandler(myHandler1, {})
            .shouldReturn('returned value')
            .matchIo(sleep(1))
            .matchNext({}, 'returned value')
            .run();
        });
        test('with shouldReturn in last', () => {
          testReduxHandler(myHandler1, {})
            .matchIo(sleep(1))
            .matchNext({}, 'returned value')
            .shouldReturn('returned value')
            .run();
        });
      });

      describe('failure', () => {
        test('throws because invalid returned value', () => {
          expect(() => (
            testReduxHandler(myHandler1, {})
              .matchIo(sleep(1))
              .matchNext({}, null)
              .shouldReturn('returned value')
              .run()
          )).toThrow('Invalid returned value')
        });
      });

      test('throws because not enough io ran', () => {
        expect(() => (
          testReduxHandler(myHandler1, {})
            .matchIo(sleep(1))
            .matchNext({}, 'returned value')
            .matchIo(sleep(1))
            .shouldReturn('returned value')
            .run()
        )).toThrow('Not enough io ran')
      });

      test('throws because too much io ran', () => {
        expect(() => (
          testReduxHandler(myHandler1, {})
            .matchIo(sleep(1))
            .shouldReturn('returned value')
            .run()
        )).toThrow('Too much io ran')
      });

      test('throws because io function doesn\'t match', () => {
        expect(() => (
          testReduxHandler(myHandler1, {})
            .matchNext(sleep(1))
            .matchNext({}, 'returned value')
            .shouldReturn('returned value')
            .run()
        )).toThrow('Invalid IO#0 function')
      });

      test('throws because io function arguments doesn\'t match', () => {
        expect(() => (
          testReduxHandler(myHandler1, {})
            .matchIo(sleep(1))
            .matchNext({ type: 'DUMMY' }, 'returned value')
            .shouldReturn('returned value')
            .run()
        )).toThrow('Invalid IO#1 function arguments')
      });
    });
    describe('myHandler4', () => {
      const createDummyAction = (payload) => ({ type: 'DUMMY_ACTION', payload })
      const myAction = { type: 'MY_ACTION', payload: {} };

      const myHandler4 = handler(function*(action, { dispatch, getState, next }) {
        const { value } = yield getState();
        yield dispatch(createDummyAction(value));
        return yield next(myAction);
      });
      test('successful', () => {
        testReduxHandler(myHandler4, myAction)
          .matchGetState({ value: 42 })
          .matchDispatch(createDummyAction(42))
          .matchNext(myAction, 'returned value')
          .shouldReturn('returned value')
          .run()
      });
    });
  });
});
