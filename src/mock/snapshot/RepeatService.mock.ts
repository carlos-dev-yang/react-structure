export const repeat = (word: string, times = 2) => {
  const words = [];
  return new Array(times)
    .fill(word)
    .map(() => word)
    .join();
};
