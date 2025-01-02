import {
  debugGrid,
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const parse = (input: string) => {
  return input
    .split('\n\n')
    .map((row) => row.split('\n').map((el) => el.split('')));
};

const solution = (input: string) => {
  const grids = parse(input);
  const locks: number[][] = [];
  const keys: number[][] = [];
  const overlap = grids[0].length - 2;

  grids.forEach((lock) => {
    const size: number[] = [];
    const isLock = lock[0].every((e) => e === '#');

    lock.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === '#') {
          if (size[x] !== undefined) size[x]++;
          if (size[x] === undefined) size[x] = 0;
        }
      });
    });

    isLock ? locks.push(size) : keys.push(size);
  });

  let fitLocks = 0;

  keys.forEach((key) => {
    locks.forEach((lock) => {
      if (key.every((el, idx) => el + lock[idx] <= overlap)) {
        fitLocks++;
      }
    });
  });

  return fitLocks;
};

runner({
  path,
  solution: (input) => solution(input),
});
