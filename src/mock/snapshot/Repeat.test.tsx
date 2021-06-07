import * as RepeatService from './RepeatService.mock';

test('repeats words three times', () => {
  expect(RepeatService.repeat('test', 3)).toMatchInlineSnapshot(`"test,test,test"`);
});
