import { writeFileSync } from 'fs';
import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const isSample = path.match('sample.txt');
// Part2 helper
// const dataSave: string[] = [];
// const debugGrid = <T>(lines: T[][]) => {
//   return lines
//     .map((e, y) => e.map((i) => (i === 0 ? '.' : i)).join('') + '\n')
//     .join('');
// };

const solution = (input: string) => {
  const data = splitLines(input).map((row) => {
    const [p, v] = row.split(' ');
    const [, x, y] = p.match(/([-\d]+),([-\d]+)/) || [];
    const [, vx, vy] = v.match(/([-\d]+),([-\d]+)/) || [];
    return [
      [+x, +y],
      [+vx, +vy],
    ];
  });

  const maxy = isSample ? 7 : 103;
  const maxx = isSample ? 11 : 101;

  const space = new Array(maxy)
    .fill('.')
    .map(() => new Array<number>(maxx).fill(0));

  data.forEach(([[x, y]]) => space[y][x]++);

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < data.length; j++) {
      const [[x, y], [vx, vy]] = data[j];
      let rx = x + vx;
      let ry = y + vy;

      if (rx < 0) rx = maxx + rx;
      if (ry < 0) ry = maxy + ry;
      if (rx >= maxx) rx = rx - maxx;
      if (ry >= maxy) ry = ry - maxy;

      data[j][0] = [rx, ry];
      space[ry][rx]++;

      if (space[y][x] > 0) space[y][x]--;
    }

    // Part2 helper
    // dataSave.push(debugGrid(space));
  }

  // Part2 helper
  // writeFileSync(
  //   './data',
  //   dataSave
  //     .map((e, i) => {
  //       return 'stage' + i + '\n' + e;
  //     })
  //     .join(''),
  // );

  const halfMaxx = Math.floor(maxx / 2);
  const halfMaxy = Math.floor(maxy / 2);
  const result: number[] = [0, 0, 0, 0];

  space.forEach((row, idy) => {
    row.forEach((_, idx) => {
      if (idy < halfMaxy && idx < halfMaxx) result[0] += space[idy][idx];
      if (idy > halfMaxy && idx < halfMaxx) result[1] += space[idy][idx];
      if (idy < halfMaxy && idx > halfMaxx) result[2] += space[idy][idx];
      if (idy > halfMaxy && idx > halfMaxx) result[3] += space[idy][idx];
    });
  });

  return result.reduce((acc, curr) => (acc *= curr), 1);
};

runner({
  path,
  solution: (input) => solution(input),
});
