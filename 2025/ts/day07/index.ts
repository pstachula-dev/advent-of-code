import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${SAMPLE_PATH}`;

const solution = (input: string) => {
  const lines = splitLines(input);
  return lines;
};

runner({
  path,
  solution: (input) => solution(input),
});
