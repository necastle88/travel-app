import "@babel/polyfill";
import { days } from '../src/server/helpers/days.js';

const day = 15;

test('The days should be 1 minus the input 15 - 1 = 14', () => {
  expect(days(day)).toBe(14);
});