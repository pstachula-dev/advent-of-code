import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const debug = (lines: string[][]) => {
  lines.map((e, y) => console.log(y, e.join('')));
  console.log('\n');
};

type Antena = {
  name: string;
  x: number;
  y: number;
};

const p1 = (lines: string[][]) => {
  debug(lines);
  const antenas: Antena[] = [];

  lines.forEach((row, idy) => {
    row.forEach((cell, idx) => {
      if (cell !== '.') antenas.push({ name: cell, x: idx, y: idy });
    });
  });

  antenas.forEach((item, idx) => {
    antenas.forEach(({ x, y, name }) => {
      if (name === item.name && item.x !== x && item.y !== y) {
        const diffY = item.y + (item.y - y);
        const diffX = item.x + (item.x - x);

        if (lines[diffY]?.[diffX]) {
          lines[diffY][diffX] = '#';
        }
      }
    });
  });

  let counter = 0;

  lines.forEach((row) =>
    row.forEach((cell, idx) => {
      if (cell === '#') counter++;
    }),
  );

  debug(lines);

  return counter;
};

const p2 = (lines: string[][]) => {
  const antennas: Antena[] = [];
  let counter = 0;
  const yMax = lines.length;
  const xMax = lines[0].length;

  lines.forEach((row, idy) => {
    row.forEach((cell, idx) => {
      if (cell !== '.') antennas.push({ name: cell, x: idx, y: idy });
    });
  });

  antennas.forEach((item, idx) => {
    antennas.forEach(({ x, y, name }) => {
      if (name === item.name && item.x !== x && item.y !== y) {
        let diffY = item.y + (item.y - y);
        let diffX = item.x + (item.x - x);
        let factor = 1;

        while (diffX <= xMax && diffY <= yMax && diffY >= 0 && diffY >= 0) {
          if (lines[diffY]?.[diffX] === '.') {
            lines[diffY][diffX] = '#';
          }

          diffY = item.y + (item.y - y) * factor;
          diffX = item.x + (item.x - x) * factor++;
        }
      }
    });
  });

  lines.forEach((row) =>
    row.forEach((cell) => {
      if (cell === '#') counter++;
    }),
  );

  // debug(lines);

  return counter + antennas.length;
};

runner({
  path,
  solution: (input) => {
    const lines = splitLines(input).map((row) => row.split(''));

    return { p2: p2(lines) };
  },
});
