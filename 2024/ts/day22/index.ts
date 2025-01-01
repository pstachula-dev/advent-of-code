import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const MAX = 2000;
const MOD = 16777216;
const MASK = 0xffffff;

const mix = (secret: number, val: number) => ((secret ^ val) & MASK) % MOD;

const getSecret = (secret: number) => {
  const s1 = mix(secret, secret << 6);
  const s2 = mix(s1, s1 >> 5);
  return mix(s2, s2 << 11);
};

const solution1 = (input: string) => {
  return splitLines(input)
    .map(Number)
    .map((secret) => {
      let final = secret;
      for (let i = 0; i < MAX; i++) {
        final = getSecret(final);
      }
      return final;
    })
    .reduce((acc, curr) => (acc += curr), 0);
};

const solution2 = (input: string) => {
  const diffs: Record<string, number[]> = {};

  splitLines(input)
    .map(Number)
    .forEach((secret) => {
      let final = secret;
      let last = secret % 10;
      const keysCache: Record<string, boolean> = {};
      const key: string[] = [];

      for (let i = 0; i < 2000; i++) {
        final = getSecret(final);
        const price = final % 10;
        const diff = price - last;
        last = price;

        key.push(String(diff));

        if (key.length > 3) {
          const keyStr = key.join('');
          if (!diffs[keyStr]) diffs[keyStr] = [];

          if (!keysCache[keyStr]) {
            diffs[keyStr].push(price);
            keysCache[keyStr] = true;
          }
          key.shift();
        }
      }
    });

  return Math.max(
    ...Object.values(diffs).map((val) => val.reduce((a, c) => a + c, 0)),
  );
};

runner({
  path,
  solution: (input) => solution1(input),
});

runner({
  path,
  solution: (input) => solution2(input),
});
