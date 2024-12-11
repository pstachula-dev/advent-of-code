import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${SAMPLE_PATH}`;

const p1 = (lines: number[]) => {
  let values = [...lines];
  const cache = new Map<number, number[]>();

  for (let i = 0; i < 35; i++) {
    const nextValues: number[] = [];

    for (const el of values) {
      let result: number[];

      if (el === 0) {
        result = [1];
        nextValues.push(...result);
        continue;
      }

      const elStr = el.toString();

      if (elStr.length % 2 === 0) {
        const half = elStr.length / 2;
        result = [Number(elStr.slice(0, half)), Number(elStr.slice(half))];
      } else {
        result = [el * 2024];
      }
      nextValues.push(...result);
    }
    values = nextValues;
  }

  return values.length;
};

runner({
  path,
  solution: (input) => {
    const lines = input.split(' ').map(Number);

    return { p1: p1(lines) };
  },
});
