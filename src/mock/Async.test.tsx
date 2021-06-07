import axios from 'axios';
import * as AsyncService from './AsyncService.mock';

describe('async test', () => {
  const testUserData = { id: 1, name: 'james' };
  it('promise use case', () => {
    return AsyncService.getTestuser().then((user) => {
      expect(user).toEqual(testUserData);
    });
  });

  it('async use case', async () => {
    const user = await AsyncService.getTestuser();
    expect(user).toEqual(testUserData);
  });
});
