import { zip, unzip, sum, sumBy } from 'lodash';
import { INPUT_PATH, runner, SAMPLE_PATH } from '../../../lib/utils';

const path = `${__dirname}/${SAMPLE_PATH}`;

runner({
  path,
  solution: (input) => {
    const lines = input.split('\n').slice(0, -1);

    const [left, right] = unzip(
      lines.map((row) => {
        const [x, y] = row.split('  ');
        return [Number(x), Number(y)];
      }),
    ).map((list) => list.sort());

    // Part1
    const p1 = sumBy(zip(left, right), ([x, y]) =>
      Math.abs(Number(x) - Number(y)),
    );

    // Part2
    const p2 = sum(left.map((x) => right.filter((y) => x === y).length * x));

    return { p1, p2 };
  },
});
