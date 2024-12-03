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
    .filter((pairs) => {
      const diffs = pairs.map(([x, y]) => x - y);
      return (
        diffs.every((diff) => diff <= 3 && diff > 0) ||
        diffs.every((diff) => diff >= -3 && diff < 0)
      );
    }).length;
};

const tryGetSafeLevel = (lines: number[][]) => {
  return lines.filter((line) =>
    getSafeLevel(
      line.map((_, idx) => line.slice(0, idx).concat(line.slice(idx + 1))),
    ),
  ).length;
};

// Part 1
runner({
  path,
  solution: (input) => {
    const lines = splitLines(input).map((e) => e.split(' ').map(Number));

    return { p1: getSafeLevel(lines), p2: tryGetSafeLevel(lines) };
  },
});
