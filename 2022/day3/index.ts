import {
  runner,
  alphabet,
  splitToFlatArray,
  sum,
  INPUT_PATH,
} from '../../lib/utils';
import * as R from 'ramda';

const users = [
  { name: 'john', age: 20, gender: 'm' },
  { name: 'marry', age: 22, gender: 'f' },
  { name: 'samara', age: 24, gender: 'f' },
  { name: 'paula', age: 24, gender: 'f' },
  { name: 'bill', age: 33, gender: 'm' },
];

interface User {
  name: string;
  age: number;
  gender: string;
}

// <typeof users[0], typeof users[0][]>
console.log(
  R.pipe(
    R.filter<User>((x) => x.gender === 'f'),
    R.map((x) => x),
    R.groupBy((x) => x.gender),
  )(users),
);

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

// Part 2 2708
runner({
  path,
  solution: (input) => {
    return splitToFlatArray({ input })
      .map((_, i, arr) => (i % 3 === 0 ? arr.slice(i, i + 3) : []))
      .filter((arr) => arr?.length > 0)
      .map((arr) => arr.map((el) => el.split('')))
      .map(findUniqueChar)
      .reduce(sum, 0);
  },
});
