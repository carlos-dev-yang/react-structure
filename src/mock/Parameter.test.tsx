import { areAnagrams } from './ParameterService.mock';

test('default test', () => {
  expect(areAnagrams('car', 'bike')).toBe(false);
  expect(areAnagrams('', '')).toBe(true);
});

type arrayData = [string, string, boolean];

const testArray: arrayData[] = [
  ['cat', 'dog', false],
  ['car', 'arc', true],
  ['cat', 'bike', false],
  ['bike', 'keib', true],
];

test.each(testArray)('anagramData(%s, %s) returns %s', (first, second, expected) => {
  expect(areAnagrams(first, second)).toBe(expected);
});

const testLowerCaseArray = [
  ['Cat', 'Act'],
  ['Save', 'Vase'],
  ['Elbow', 'Below'],
];

describe.each(testLowerCaseArray)('anagramData(%s, %s) returns %s', (first, second) => {
  it('return true with ignoreCase Option', () => {
    expect(areAnagrams(first, second, { ignoreCase: true })).toBe(true);
  });

  it('return false without ignoreCase option', () => {
    expect(areAnagrams(first, second)).toBe(false);
  });
});

const testSpaceArray = [
  ['cat', 'ac t'],
  ['save', 'vas e'],
  ['elbow', 'b el ow'],
];

describe.each(testSpaceArray)('anagramData(%s, %s) returns %s', (first, second) => {
  it('return true with ignoreSpaces Option', () => {
    expect(areAnagrams(first, second, { ignoreSpaces: true })).toBe(true);
  });

  it('return false without ignoreSpace option', () => {
    expect(areAnagrams(first, second)).toBe(false);
  });
});
