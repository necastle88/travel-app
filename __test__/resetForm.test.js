import "@babel/polyfill";
import { futureDate } from '../src/server/helpers/futureDate';
const days = 5;
const date = new Date("12-01-2021"); 

test('sets a future date in = "yyyy-mm-dd"', () => {
  expect(futureDate(date, days)).toBe("2021-12-06");
});