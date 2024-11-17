import { INPUT_PATH, runner, splitToFlatArray, sum } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const seeds = '79 14 55 13'.split(' ');

// Part 1
runner({
  path,
  solution: (input) => {
    type Map = { name: string; data: number[] };
    const result = 0;
    const dataMap: Map[] = [];

    input.split('\n\n').map((group) => {
      group.split('\n').map((row, rowIdx) => {
        
      });
    });

    return `1: ${result}`;
  },
});
