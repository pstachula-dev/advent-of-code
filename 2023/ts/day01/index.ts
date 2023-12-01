import { INPUT_PATH, runner, splitToFlatArray, sum } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const numberMap = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];
const wordMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

// Part 1
runner({
  path,
  solution: (input) => {
    return splitToFlatArray({ input, splitChar: '\n' })
      .map((group) => {
        const row = [...group].filter((item) => !isNaN(Number(item)));
        return Number((row.at(0) || '') + (row.at(-1) || ''));
      })
      .reduce(sum);
  },
});

// Part 2
runner({
  path,
  solution: (input) => {
    return splitToFlatArray({ input, splitChar: '\n' })
      .map((row) => {
        let rowTmp = row;
        let val = '';

        while (rowTmp.length) {
          if (!isNaN(Number(rowTmp[0]))) {
            val += rowTmp[0];
            rowTmp = rowTmp.substring(1);
            continue;
          }

          const word = rowTmp.substring(0, 3);

          const search = numberMap.find(
            (num) => num.startsWith(word) && rowTmp.match(num),
          );

          if (search && word.length >= 3) {
            val += wordMap[search];
          }
          rowTmp = rowTmp.substring(1);
        }

        return Number((val.at(0) || '') + (val.at(-1) || ''));
      })
      .reduce(sum);
  },
});
