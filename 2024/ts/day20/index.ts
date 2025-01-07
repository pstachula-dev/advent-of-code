import {
  directions,
  findGridPos,
  getGrid,
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type Point = {
  x: number;
  y: number;
};

const bfs = (grid: string[][], start: Point, end: Point) => {
  const maxy = grid.length;
  const maxx = grid[0].length;
  const visited = getGrid(maxy, maxx, false);
  const queue: [Point, Point[]][] = [[start, [start]]];

  while (queue.length) {
    const [curr, path] = queue.shift()!;

    if (curr.x === end.x && curr.y === end.y) return path;

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

const getManhatanDist = (point1: Point, point2: Point) => {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
};

const parseInput = (input: string) => {
  const grid = splitLines(input).map((r) => r.split(''));
  const start = findGridPos(grid, 'S');
  const end = findGridPos(grid, 'E');
  const path = bfs(grid, start, end);

  return { grid, path };
};

export const solution2 = (
  input: string,
  maxDist: number,
  minPicoSize: number,
) => {
  const { grid, path } = parseInput(input);
  const results: Record<number, number> = {};

  for (let i = 0; i < path.length; i++) {
    const point = path[i];

    for (let j = i + 1; j < path.length; j++) {
      const dist = getManhatanDist(point, path[j]);
      const diff = j - dist - i;

      if (dist > maxDist || diff < minPicoSize) continue;

      if (results[diff] === undefined) {
        results[diff] = 1;
      } else {
        results[diff]++;
      }
    }
  }

  return Object.values(results).reduce((acc, curr) => acc + curr, 0);
};

runner({
  path,
  name: 'Part 1',
  solution: (input) => solution2(input, 2, 100),
});

runner({
  path,
  name: 'Part 2',
  solution: (input) => solution2(input, 20, 100),
});
