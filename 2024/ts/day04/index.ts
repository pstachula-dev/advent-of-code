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
    row.forEach((_, idx) => {
      searchEvery.forEach((s) => {
        if (s.every((el, index) => row[idx + index] === el)) total++;
        if (s.every((el, index) => lines[idy + index]?.[idx] === el)) total++;
        if (s.every((el, index) => lines[idy + index]?.[idx - index] === el))
          total++;
        if (s.every((el, index) => lines[idy + index]?.[idx + index] === el))
          total++;
      });
    });
  });

  return total;
};

const p2 = (lines: string[][]) => {
  let total = 0;

  lines.forEach((row, idy) => {
    row.forEach((el, idx) => {
      total +=
        searchEveryX.some((s) =>
          s.every((el, index) => lines[idy + index]?.[idx + index] === el),
        ) &&
        searchEveryX.some((s) =>
          s.every((el, index) => lines[idy + index]?.[idx + 2 - index] === el),
        )
          ? 1
          : 0;
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
