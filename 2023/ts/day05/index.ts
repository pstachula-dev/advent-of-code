import { INPUT_PATH, runner, splitToFlatArray, sum } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

// Part 1
runner({
  path,
  solution: (input) => {
    let result = 0;

    splitToFlatArray({ input }).map((line) => {});

    return `1: ${result}`;
  },
});
