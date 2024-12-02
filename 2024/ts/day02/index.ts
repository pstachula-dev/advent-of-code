import { zip } from 'lodash';
import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
  sum,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const getSafeLevel = (lines: number[][]) => {
  return lines
    .map((line) => zip(line, line.slice(1)).slice(0, -1) as number[][])
    .filter(
      (pairs) =>
        pairs.every(([x, y]) => x - y <= 3 && x - y > 0) ||
        pairs.every(([x, y]) => y - x <= 3 && y - x > 0),
    ).length;
};

const tryGetSafeLevel = (lines: number[][]) => {
  return lines
    .map((line) =>
      getSafeLevel(
        line.map((_, idx) => [...line.slice(0, idx), ...line.slice(idx + 1)]),
      ),
    )
    .filter(Boolean).length;
};

// Part 1
runner({
  path,
  solution: (input) => {
    const lines = splitLines(input).map((e) => e.split(' ').map(Number));

    const p1 = getSafeLevel(lines);
    const p2 = tryGetSafeLevel(lines);

    return { p1, p2 };
  },
});
