export const getTestuser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = {
        id: 1,
        name: 'james',
      };
      resolve(user);
    }, 100);
  });
};
