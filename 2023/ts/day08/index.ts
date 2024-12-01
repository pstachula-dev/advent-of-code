import { sum } from 'lodash';
import { INPUT_PATH, runner, splitToFlatArray } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const START = 'AAA';
const END = 'ZZZ';

const firstPart = (movesStr: string, data: string[]) => {
  const children = new Map<string, string[]>();
  const moves = movesStr.split('');

  data.forEach((row) => {
    const [node, rest] = row.split(' = ');
    children.set(node, rest.replace(/[()]/g, '').split(', '));
  });

  let current = START;
  let movesQueue: string[] = [...moves];
  let iterations = 0;

  while (current !== END) {
    if (movesQueue.length === 0) {
      movesQueue = [...moves];
    }

    const keys = children.get(current);

    if (keys) {
      current = keys[movesQueue.shift() === 'R' ? 1 : 0];
      iterations++;
    }
  }

  return { iterations };
};

const secondPart = (movesStr: string, data: string[]) => {
  const children = new Map<string, string[]>();
  const startChildren: string[] = [];
  const moves = movesStr.split('');

  data.forEach((row) => {
    const [node, rest] = row.split(' = ');
    children.set(node, rest.replace(/[()]/g, '').split(', '));

    if (node.endsWith('A')) {
      startChildren.push(node);
    }
  });

  let movesQueue: string[] = [...moves];

  const cycles = startChildren.map((value) => {
    let current = value;
    let steps = 0;

    while (!current.endsWith('Z')) {
      if (movesQueue.length === 0) {
        movesQueue = [...moves];
      }

      const keys = children.get(current);

      if (keys) {
        current = keys[movesQueue.shift() === 'R' ? 1 : 0];
        steps++;
      }
    }

    return steps;
  });

  return leasetCommonMultiple(cycles);
};

const greatCommonDivisor = (a: number, b: number) => {
  while (b > 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

const leasetCommonMultiple = (cycles: number[]) => {
  return cycles.reduce(
    (acc, curr) => Math.abs(acc * curr) / greatCommonDivisor(acc, curr),
  );
};

runner({
  path,
  solution: (input) => {
    const [moves, _empty, ...data] = input.split('\n').slice(0, -1);
    return secondPart(moves, data);
  },
});
