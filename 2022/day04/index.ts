import { INPUT_PATH, runner, splitIntoGroups } from '../../lib/utils';

// Part 1
runner({
  path: `${__dirname}/${INPUT_PATH}`,
  solution: input => {
    return splitIntoGroups({
      input,
      splitGroupChar: '\n',
      splitChar: ',',
    }).filter(([left, right]) => {
      const [firstStart, firstEnd] = left.split('-').map(e => parseInt(e));
      const [secondStart, secondEnd] = right.split('-').map(e => parseInt(e));

      return (
        (firstStart <= secondStart && firstEnd >= secondEnd) ||
        (firstStart >= secondStart && firstEnd <= secondEnd)
      );
    }).length;
  },
});

// Part 2
runner({
  path: `${__dirname}/${INPUT_PATH}`,
  solution: input => {
    return splitIntoGroups({
      input,
      splitGroupChar: '\n',
      splitChar: ',',
    }).filter(([left, right]) => {
      const [firstStart, firstEnd] = left.split('-').map(e => parseInt(e));
      const [secondStart, secondEnd] = right.split('-').map(e => parseInt(e));

      return firstStart <= secondEnd && firstEnd >= secondStart;
    }).length;
  },
});
