import { add, multiply, range } from 'lodash';
import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const permutate = (n: number): string[] => {
  const results: string[] = [];
  const operators = ['+', '*'];

  const generatePermutations = (current: string[], length: number) => {
    if (length === 0) {
      results.push(current.join(''));
      return;
    }

    for (const op of operators) {
      generatePermutations([...current, op], length - 1);
    }
  };

  generatePermutations([], n);

  return results;
};

const p1 = (
  lines: { result: number; values: number[] }[],
  permutations: string[][],
) => {
  return lines
    .filter(({ result, values }) =>
      permutations[values.length - 2].some(
        (perms) =>
          result ===
          perms
            .split('')
            .reduce(
              (acc, curr, idx) =>
                curr === '+'
                  ? add(acc, values[idx + 1])
                  : multiply(acc, values[idx + 1]),
              values[0],
            ),
      ),
    )
    .reduce((acc, curr) => acc + curr.result, 0);
};

runner({
  path,
  solution: (input) => {
    const lines = splitLines(input).map((row) => {
      const [result, values] = row.split(':');
      return {
        result: Number(result),
        values: values.trim().split(' ').map(Number),
      };
    });

    const permutations = range(1, 12).map((el) => permutate(el));
    return { p1: p1(lines, permutations) };
  },
});
