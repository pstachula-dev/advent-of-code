import {
  debugGrid,
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  directions,
  splitLines,
  getGrid,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const solution = (input: string, size: number, bytes: number) => {
  const grid = getGrid(size, size, '.');
  const positions = splitLines(input).map((r) => r.split(',').map(Number));
  positions.slice(0, bytes).forEach(([x, y]) => {
    grid[y][x] = '#';
  });

  const queue: [number, number, number][] = [[0, 0, 0]];
  const visited = getGrid(size, size, false);
  // debugGrid(grid);

  while (queue.length) {
    const [x, y, pathSize] = queue.shift()!;

    if (x === size - 1 && y === size - 1) {
      return pathSize;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= size || nx < 0 || ny < 0 || ny >= size) continue;
      if (visited[ny][nx]) continue;
      if (grid[ny][nx] === '#') continue;

      visited[ny][nx] = true;
      queue.push([nx, ny, pathSize + 1]);
    }
  }
};

const solution2 = (input: string, size: number, bytes: number) => {
  const positions = splitLines(input).map((r) => r.split(',').map(Number));
  let lastFalse: number[] = [];

  for (let i = positions.length - 1; i > bytes; i--) {
    const grid = getGrid(size, size, '.');
    const queue: [number, number, number][] = [[0, 0, 0]];
    const visited = getGrid(size, size, false);

    positions.slice(0, i + 1).forEach(([x, y]) => {
      grid[y][x] = '#';
    });

    let exit = false;

    while (queue.length) {
      const [x, y, pathSize] = queue.shift()!;

      if (x === size - 1 && y === size - 1) {
        exit = true;
        break;
      }

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= size || nx < 0 || ny < 0 || ny >= size) continue;
        if (visited[ny][nx]) continue;
        if (grid[ny][nx] === '#') continue;

        visited[ny][nx] = true;
        queue.push([nx, ny, pathSize + 1]);
      }
    }

    if (!exit) {
      lastFalse = positions[i];
    } else {
      return lastFalse;
    }
  }
};

runner({
  path,
  // example
  // solution: (input) => solution2(input, 7, 12),
  solution: (input) => solution(input, 71, 1024),
});

runner({
  path,
  solution: (input) => solution2(input, 71, 1024),
});
