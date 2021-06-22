import * as data from './CRUDData.mock';
import * as userService from './CRUDService.mock';
import { IUserTypes } from '@src/mock/types';

describe('async pattern', () => {
  beforeEach(() => {
    data.users.push(
      { id: 1, email: 'user1@test.com' },
      { id: 2, email: 'user2@test.com' },
      { id: 3, email: 'user3@test.com' },
    );
  });

  afterEach(() => {
    data.users.splice(0);
  });

  it('find all users', () => {
    const users = userService.findAll();

    expect(users).toHaveLength(3);
    expect(users).toContainEqual({ id: 1, email: 'user1@test.com' });
    expect(users).toContainEqual({ id: 2, email: 'user2@test.com' });
    expect(users).toContainEqual({ id: 3, email: 'user3@test.com' });
  });

  it('create user', () => {
    const newUser: IUserTypes = { id: 4, email: 'user4@test.com' };
    const userLength = data.users.length;

    userService.create(newUser);

    expect(data.users).toHaveLength(userLength + 1);
    expect(data.users).toContainEqual(newUser);
  });

  test('destory user', () => {
    const destroyId = 3;
    const userLength = data.users.length;
    const targetUser = data.users.find((user) => user.id === destroyId);

    userService.destroy(destroyId);

    expect(data.users).toHaveLength(userLength - 1);
    expect(data.users).not.toContainEqual(targetUser);
  });

  test('update user', () => {
    const updateId = 2;
    const email = `admin${updateId}@test.com`;

    userService.update(updateId, { id: updateId, email });
  });
});
