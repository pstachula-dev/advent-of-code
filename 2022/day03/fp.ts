import * as R from 'remeda';
import {
  runner,
  alphabet,
  splitToFlatArray,
  INPUT_PATH,
} from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

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

// Part 1 8298
runner({
  path,
  solution: (input) =>
    R.pipe(
      splitToFlatArray({ input }),
      R.map((line) => {
        return findUniqueChar([
          line.split('').slice(0, line.length / 2),
          line.split('').slice(line.length / 2, line.length),
        ]);
      }),
      R.reduce((acc, item) => acc + item, 0),
    ),
});

// Part 2 2708
runner({
  path,
  solution: (input) =>
    R.pipe(
      splitToFlatArray({ input }),
      R.map.indexed((_, i, arr) => (i % 3 === 0 ? arr.slice(i, i + 3) : [])),
      R.filter((arr) => arr?.length > 0),
      R.map((arr) => arr.map((el) => el.split(''))),
      R.map(findUniqueChar),
      R.reduce((acc, item) => acc + item, 0),
    ),
});
