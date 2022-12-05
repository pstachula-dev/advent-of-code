import { parseInt } from 'lodash';
import { INPUT_PATH, runner, splitIntoGroups } from '../../lib/utils';

const crateMover9000 = (input: string, reverse?: boolean) => {
  const cols: string[][] = [];
  const [table, moves] = splitIntoGroups({ input });
  const movesMap = moves.map((move) =>
    move.match(/\d+/g)?.map((el) => parseInt(el)),
  );

  table.forEach((_, index) => {
    cols[index] = [];
    table.forEach((row) => {
      const rowChars = row
        .split('')
        .filter((el, i) => ((i + 1) % 2 === 0 ? el : null))
        .filter((el, i) => (i % 2 === 0 && el !== '' ? el : null));

      if (rowChars[index] !== ' ') {
        cols[index].push(rowChars[index]);
      }
    });
    cols[index].reverse();
  });

  movesMap.forEach(([moves, from, to] = []) => {
    const crates = cols[from - 1].splice(cols[from - 1].length - moves);
    cols[to - 1].push(...(reverse ? crates.reverse() : crates));
  });

  return cols.map((el) => el.at(-1)).join('');
};

// Part 1
runner({
  path: `${__dirname}/${INPUT_PATH}`,
  solution: (input) => crateMover9000(input, true),
});

// Part 2
runner({
  path: `${__dirname}/${INPUT_PATH}`,
  solution: (input) => crateMover9000(input),
});
