import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${SAMPLE_PATH}`;

const p1 = (lines: string[]) => {
  return lines;
};

runner({
  path,
  solution: (input) => {
    const lines = splitLines(input);

    return { p1: p1(lines) };
  },
});
