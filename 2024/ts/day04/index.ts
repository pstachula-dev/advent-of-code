import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const search = ['X', 'M', 'A', 'S'];
const searchEvery = [search, search.toReversed()];
const searchEveryX = [search.slice(1), search.slice(1).toReversed()];

const p1 = (lines: string[][]) => {
  let total = 0;

  lines.forEach((row, idy) => {
    row.forEach((el, idx) => {
      // horizontal
      if (
        searchEvery.some((s) => s.every((letter, i) => row[idx + i] === letter))
      ) {
        total += 1;
      }

      // vertical
      if (
        searchEvery.some((s) =>
          s.every((letter, i) => lines[idy + i]?.[idx] === letter),
        )
      ) {
        total += 1;
      }

      // diagonal right
      if (
        searchEvery.some((s) =>
          s.every((letter, i) => lines[idy + i]?.[idx + i] === letter),
        )
      ) {
        total += 1;
      }

      // diagonal left
      if (
        searchEvery.some((s) =>
          s.every((letter, i) => lines[idy + i]?.[idx - i] === letter),
        )
      ) {
        total += 1;
      }
    });
  });

  return total;
};

const p2 = (lines: string[][]) => {
  let total = 0;

  lines.forEach((row, idy) => {
    row.forEach((el, idx) => {
      if (
        searchEveryX.some((s) =>
          s.every((letter, i) => lines[idy + i]?.[idx + i] === letter),
        ) &&
        searchEveryX.some((s) =>
          s.every((letter, i) => lines[idy + i]?.[idx + 2 - i] === letter),
        )
      ) {
        total += 1;
      }
    });
  });

  return total;
};

runner({
  path,
  solution: (input) => {
    const lines = splitLines(input).map((row) => row.split(''));

    return { p1: p1(lines), p2: p2(lines) };
  },
});
