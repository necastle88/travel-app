import { resetTextValue } from '../src/client/js/helpers/resetText';

test('resets any text value to = ""', () => {
  expect(resetTextValue()).toBe("");
});