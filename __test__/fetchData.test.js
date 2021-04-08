import "@babel/polyfill";
import { fetchData } from '../src/client/js/helpers/fetchData';

const fetchDataURL = 'https://jsonplaceholder.typicode.com/todos/1'

test('the data is ', async () => {
  const data = await fetchData(fetchDataURL);
  expect(data).toEqual({
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  });
});