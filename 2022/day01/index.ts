import { INPUT_PATH, runner, splitIntoGroups } from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

// Part 1
runner({
  path,
  solution: (input) => {
    const data = splitIntoGroups({
      input,
      parser: (e) => Number(e),
    });

    return Math.max(...data.map((group) => group.reduce((a, b) => a + b, 0)));
  },
});

// Part 2
runner({
  path,
  solution: (input) => {
    const data = splitIntoGroups({
      input,
      parser: (e) => Number(e),
    });

    return data
      .map((group) => group.reduce((a, b) => a + b, 0))
      .sort((a, b) => b - a)
      .splice(0, 3)
      .reduce((a, b) => a + b, 0);
  },
});
