import { sum } from 'lodash';
import { INPUT_PATH, runner, splitToFlatArray } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const computeSteps = (values: number[], backward: boolean) => {
  const rows: number[][] = [values];

  while (rows.at(-1)?.some(row => row !== 0)) {
    const nextRow = [];
    const lastRow = rows.at(-1);
    if (!lastRow) break;

    for (let i = 0; i < lastRow.length; i++) {
      if (i < lastRow.length - 1) {
        nextRow.push(lastRow[i + 1] - lastRow[i]);
      }
    }

    rows.push(nextRow);
  }

  let last = 0;

  for (let i = rows.length - 1; i >= 0; i--) {
    const prev = (backward ? rows[i].at(0) : rows[i].at(-1)) || 0;
    last = backward ? prev - last : prev + last;
  }

  return last;
};

// Part 1
runner({
  path,
  solution: input => {
    const values = input
      .split('\n')
      .slice(0, -1)
      .map(line => line.split(/\s+/).map(Number));

    return sum(values.map(el => computeSteps(el, true)));
  },
});
