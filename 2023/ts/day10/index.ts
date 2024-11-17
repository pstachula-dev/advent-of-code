import { INPUT_PATH, runner, splitToFlatArray } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const part1 = (lines: string[][]) => {
  const galxies: [number, number][] = [];
  const expanded = [...lines];

  // Expand
  for (let y = 0; y < lines.length; y++) {
    if (lines[y].every((el) => el === '.')) {
      const diff = y + expanded.length - lines.length;
      expanded.splice(diff, 0, lines[y]);
    }

    let posX: null | number = null;

    for (let x = 0; x < lines[y].length; x++) {
      if (lines[x][y] !== '.') posX = y;
    }

    if (posX) {
      const len = lines[y].length;

      for (let x = 0; x < len; x++) {
        lines[y].splice(posX, 0, '.');
      }
    }
  }

  expanded.forEach((row) => {
    console.log(row.join(''));
  });

  // Check coordinates
  // lines.forEach((row, y) => {
  //   row.split('').forEach((cell, x) => {
  //     if (cell === '#') {
  //       galxies.push([x, y]);
  //     }
  //   });
  // });
};

runner({
  path,
  solution: (input) => {
    const lines = input
      .split('\n')
      .map((e) => e.split(''))
      .slice(0, -1);

    return part1(lines);
  },
});
