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

  return 0;
};

runner({
  path,
  // example
  // solution: (input) => solution(input, 7, 12),
  solution: (input) => solution(input, 71, 1024),
});
