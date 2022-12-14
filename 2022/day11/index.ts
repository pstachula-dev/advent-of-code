import { INPUT_PATH, runner, splitIntoGroups } from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

// Part 1
runner({
  path,
  solution: (input) => {
    const data = splitIntoGroups({ input }).map((row) => {
      const [monkey, items, operation, test, ifTrue, ifFalse] = row;
      return {
        monkey,
        items: items.split('').slice(2),
      };
    });
    console.log(data);

    return 0;
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

    return 0;
  },
});
