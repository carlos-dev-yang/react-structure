import { users, IUserTypes } from './CRUDData.mock';

export const findAll = () => users;

export const create = (user: IUserTypes) => users.push(user);

export const destroy = (id: number) => {
  users.splice(users.findIndex((user) => user.id === id));
};

export const update = (id: number, user: IUserTypes) => {
  users[users.findIndex((user) => user.id === id)] = user;
};
