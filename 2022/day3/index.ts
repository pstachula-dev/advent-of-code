import {
  runner,
  alphabet,
  splitToFlatArray,
  sum,
  INPUT_PATH,
} from '../../lib/utils';

const findUniqueChar = (arrays: string[][]) => {
  const [firstArr, ...rest] = arrays;
  const uniqueChar = firstArr.find((el) =>
    rest.every((restEl) => restEl.includes(el)),
  );

  const uniqueCharLower = (uniqueChar || '').toLocaleLowerCase();

  return uniqueChar === uniqueCharLower
    ? alphabet.indexOf(uniqueChar) + 1
    : alphabet.indexOf(uniqueCharLower) + (1 + alphabet.length);
};

// Part 1
runner({
  path: `${__dirname}/${INPUT_PATH}`,
  solution: (input) => {
    return splitToFlatArray({ input })
      .map((line) => {
        const lineArr = line.split('');
        return findUniqueChar([
          lineArr.slice(0, line.length / 2),
          lineArr.slice(line.length / 2, line.length),
        ]);
      })
      .reduce(sum, 0);
  },
});

// Part 2
runner({
  path: `${__dirname}/${INPUT_PATH}`,
  solution: (input) => {
    return splitToFlatArray({ input })
      .map((_, i, arr) => (i % 3 === 0 ? arr.slice(i, i + 3) : []))
      .filter((arr) => arr?.length)
      .map((arr) => arr.map((el) => el.split('')))
      .map(findUniqueChar)
      .reduce(sum, 0);
  },
});
