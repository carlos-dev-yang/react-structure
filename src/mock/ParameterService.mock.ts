export type anagramOptions = {
  ignoreCase?: boolean;
  ignoreSpaces?: boolean;
};

export const areAnagrams = (first: string, second: string, options?: anagramOptions): boolean => {
  const counter = {};

  if (options?.ignoreSpaces) {
    first = first.replace(/ /gi, '');
    second = second.replace(/ /gi, '');
  }

  if (options?.ignoreCase) {
    first = first.toLowerCase();
    second = second.toLowerCase();
  }

  [...first].forEach((text) => (counter[text] = (counter[text] || 0) + 1));
  [...second].forEach((text) => (counter[text] = (counter[text] || 0) - 1));

  return Object.values(counter).every((cnt) => cnt === 0);
};
