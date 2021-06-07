import axios from 'axios';

const endPoint = 'https://jsonplaceholder.typicode.com/users';

export const findData = async (id) => {
  const result = await axios.get(`${endPoint}/${id}`);
  return result.data;
};
