import {
  debugGrid,
  directions,
  findGridPos,
  getGrid,
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${SAMPLE_PATH}`;

type Point = {
  x: number;
  y: number;
};

const bfs = (grid: string[][], start: Point, end: Point) => {
  const maxy = grid.length;
  const maxx = grid[0].length;
  const visited = getGrid(maxy, maxx, false);
  const queue: [Point, Point[]][] = [[start, []]];

  while (queue.length) {
    const [curr, path] = queue.shift()!;

    if (curr.x === end.x && curr.y === end.y) {
      return path;
    }

    for (const [dx, dy] of directions) {
      const x = dx + curr.x;
      const y = dy + curr.y;

      if (x >= maxx || x < 0 || y < 0 || y >= maxy) continue;
      if (visited[y][x]) continue;
      if (grid[y][x] === '#') continue;

      const point = { y, x };
      visited[y][x] = true;
      queue.push([point, [...path, point]]);
    }
  }

  return [];
};

const solution = (input: string) => {
  const grid = splitLines(input).map((r) => r.split(''));
  const maxy = grid.length;
  const maxx = grid[0].length;
  const start = findGridPos(grid, 'S');
  const end = findGridPos(grid, 'E');
  const path = bfs(grid, start, end);
  const results: Record<number, number> = {};

  path.forEach((curr, idx) => {
    for (const [dx, dy] of directions) {
      const x = dx + curr.x;
      const y = dy + curr.y;

      if (x >= maxx || x < 0 || y < 0 || y >= maxy) continue;
      if (grid[y][x] !== '#') continue;

      const len = path.length - (bfs(grid, { x, y }, end).length + idx + 2);
      if (len <= 0) continue;

      if (results[len] > 0) {
        results[len]++;
      } else {
        results[len] = 1;
      }
    }
  });

  return results;
};

runner({
  path,
  solution: (input) => solution(input),
});
