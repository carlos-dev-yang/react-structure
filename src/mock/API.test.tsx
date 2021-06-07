import axios from 'axios';
import * as APIService from './APIService.mock';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

test('api test', async () => {
  mockedAxios.get.mockResolvedValue({
    data: {
      id: 1,
      name: 'james',
    },
  });

  const user = await APIService.findData(1);
  expect(user).toHaveProperty('id', 1);
  expect(user).toHaveProperty('name', 'james');
  expect(mockedAxios.get).toBeCalledTimes(1);
  expect(mockedAxios.get).toBeCalledWith('https://jsonplaceholder.typicode.com/users/1');
});
