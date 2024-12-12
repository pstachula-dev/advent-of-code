import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const cache = new Map<number, number[]>();

const blink = (values: Map<number, number>) => {
  const nextValues = new Map<number, number>();

  for (const [el, count] of values.entries()) {
    const cacheItem = cache.get(el);

    if (cacheItem) {
      nextValues.set(cacheItem[0], (nextValues.get(cacheItem[0]) || 0) + count);

      if (cacheItem[1] >= 0) {
        nextValues.set(
          cacheItem[1],
          (nextValues.get(cacheItem[1]) || 0) + count,
        );
      }

      continue;
    }

    if (el === 0) {
      nextValues.set(1, (nextValues.get(1) || 0) + count);
      cache.set(el, [1]);
      continue;
    }

    const elStrLen = el.toString().length;

    if (elStrLen % 2 === 0) {
      const half = elStrLen / 2;
      const divider = 10 ** half;
      const left = Math.floor(el / divider);
      const right = el % divider;
      nextValues.set(left, (nextValues.get(left) || 0) + count);
      nextValues.set(right, (nextValues.get(right) || 0) + count);
      cache.set(el, [left, right]);
    } else {
      const newVal = el * 2024;
      nextValues.set(newVal, (nextValues.get(newVal) || 0) + count);
      cache.set(el, [newVal]);
    }
  }

  return nextValues;
};

const p1 = (input: string, limit: number) => {
  const lines = input.split(' ').map(Number);
  let stoneCache = new Map<number, number>();
  for (const i of lines) stoneCache.set(i, 1);

  for (let i = 0; i < limit; i++) {
    stoneCache = blink(stoneCache);
  }

  return stoneCache.entries().reduce((acc, [, val]) => acc + val, 0);
};

runner({
  path,
  solution: (input) => {
    return p1(input, 25);
  },
});

runner({
  path,
  solution: (input) => {
    return p1(input, 75);
  },
});
