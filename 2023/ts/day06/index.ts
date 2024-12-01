import { INPUT_PATH, runner } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

// Part 1
runner({
  path,
  solution: input => {
    let result = 1;
    const data = input.split('\n').filter(Boolean);
    const times = data[0].split(':')[1].split(' ').filter(Boolean).map(Number);
    const distances = data[1]
      .split(':')[1]
      .split(' ')
      .filter(Boolean)
      .map(Number);

    times.forEach((time, timeIdx) => {
      let timeScore = 0;
      for (let i = 1; i <= time; i++) {
        if ((time - i) * i > distances[timeIdx]) {
          timeScore++;
        }
      }

      result *= timeScore;
    });

    return `1: ${result}`;
  },
});
