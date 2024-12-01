import { countBy, sum } from 'lodash-es';
import { INPUT_PATH, runner, SAMPLE_PATH } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

runner({
  path,
  solution: input => {
    const left: number[] = [];
    const right: number[] = [];
    input.split('\n').map(row => {
      const [l, r] = row.split('  ');
      if (!l || !r) return;
      left.push(Number(l));
      right.push(Number(r));
    });

    // left.sort();
    // right.sort();

    // Part1
    // return left.reduce(
    //   (acc, curr, idx) => acc + Math.abs(right[idx] - curr),
    //   0,
    // );

    // Part2
    return sum(
      left.map(lNum => right.filter(rNum => rNum === lNum).length * lNum),
    );
  },
});
