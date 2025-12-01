import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const solution = (input: string) => {
  let start = 50;
  let counter = 0;

  splitLines(input).forEach((el) => {
    const [dir, ...str] = el.split('');
    const num = parseInt(str.join(''));
    const rest = num % 100;
    const rotations = Math.floor(num / 100);
    const prev = start;

    start = dir === 'L' ? start - rest : start + rest;

    // Part2
    counter += rotations;
    if (prev !== 0 && (start < 1 || start > 99)) counter++;

    if (start < 0) start = 100 + start;
    if (start > 99) start = Math.abs(100 - start);

    // Part1
    // if (start === 0) counter++;
  });

  return counter;
};

runner({
  path,
  solution: (input) => solution(input),
});
