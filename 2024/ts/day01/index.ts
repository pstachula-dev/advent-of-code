import { zip, unzip, sum, sumBy } from 'lodash';
import { INPUT_PATH, runner, SAMPLE_PATH } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const parseInput = (input: string): [number[], number[]] => {
  const lines = input.split('\n').slice(0, -1);

  const [left, right] = unzip(
    lines.map((row) => {
      const [x, y] = row.split('  ');
      return [Number(x), Number(y)];
    }),
  ).map((list) => list.sort());

  return [left, right];
};

export const day01 = (input: string) => {
  const [left, right] = parseInput(input);

  return sumBy(zip(left, right), ([x, y]) => Math.abs(Number(x) - Number(y)));
};

const day02 = (input: string) => {
  const [left, right] = parseInput(input);

  return sum(left.map((x) => right.filter((y) => x === y).length * x));
};

runner({
  path,
  solution: day01,
});
