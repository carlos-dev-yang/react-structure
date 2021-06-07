import { users } from './CRUDData.mock';

export const findAll = () => users;

export const create = (user) => users.push(user);

export const destroy = (id) => {
  users.splice(users.findIndex((user) => user.id === id));
};

export const update = (id, user) => {
  users[users.findIndex((user) => user.id === id)] = user;
};
