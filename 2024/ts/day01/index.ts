import { zip, unzip, sum } from 'lodash';
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
    const p1 = zip(left, right).reduce(
      (acc, [x, y]) => acc + Math.abs(Number(x) - Number(y)),
      0,
    );

    // Part2
    const p2 = sum(left.map((x) => right.filter((y) => x === y).length * x));

    console.log(p1, p2);
  },
});
