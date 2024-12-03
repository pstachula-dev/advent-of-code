import { isNumber } from 'lodash';
import { INPUT_PATH, runner, SAMPLE_PATH } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const p1 = (lines: string) => {
  return lines
    .match(/(mul\()(\d+,\d+)\)/gm)
    ?.map((mul) =>
      mul
        .replace(/[mul()]+/g, '')
        .split(',')
        .map((num) => Number(num)),
    )
    .reduce((acc, [x, y]) => acc + x * y, 0);
};

const p2 = (lines: string) => {
  let flag = true;

  return lines
    .match(/(mul\()(\d+,\d+)\)|(do\(\))|(don't\(\))/gm)
    ?.map((mul) => {
      if (mul === 'do()') flag = true;
      if (mul === "don't()") flag = false;

      return flag
        ? mul
            .replace(/[mul()]+/g, '')
            .split(',')
            .filter((num) => !isNaN(Number(num)))
            .map((num) => Number(num))
        : [];
    })
    .filter((el) => el?.length)
    .reduce((acc, [x, y]) => acc + x * y, 0);
};

// Part 1
runner({
  path,
  solution: (input) => {
    return { p1: p1(input), p2: p2(input) };
  },
});
