import { range } from 'lodash';
import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
  permutate,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const p1 = (
  lines: { result: number; values: number[] }[],
  permutations: string[][][],
) => {
  const results = lines.filter(({ result, values }) =>
    permutations[values.length - 2].some((operators) => {
      return (
        result ===
        operators.reduce((acc, operator, idx) => {
          const next = values[idx + 1];

          switch (operator) {
            case '|':
              return acc * 10 ** next.toString().length + next;
            case '+':
              return acc + next;
            case '*':
              return acc * next;
            default:
              throw new Error('Unknown operator');
          }
        }, values[0])
      );
    }),
  );

  return results.reduce((acc, curr) => acc + curr.result, 0);
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

    const operators = ['*', '+'];
    const operatorsP2 = [...operators, '|'];

    const operationPermutations = range(1, 12).map((el) =>
      permutate(el, operatorsP2).map((row) => row.split('')),
    );

    return {
      // p1: p1(lines, operationPermutations),
      p2: p1(lines, operationPermutations),
    };
  },
});
