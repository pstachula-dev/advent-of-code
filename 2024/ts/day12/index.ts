import {
  debugGrid,
  INPUT_PATH,
  runner,
  directions,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type Node = [number, number];

const bfs = (grid: string[][], visited: boolean[][], start: Node) => {
  const rowLen = grid.length;
  const colLen = grid[0].length;
  const stack: Node[] = [start];
  const region: number[] = [];

  while (stack.length) {
    // It will never be null
    const [x, y] = stack.pop()!;

    if (visited[y][x]) continue;

    const plant = grid[y][x];

    const score = directions.filter(([dx, dy]) => {
      const moveX = x + dx;
      const moveY = y + dy;
      if (
        moveX >= 0 &&
        moveY >= 0 &&
        moveX < colLen &&
        moveY < rowLen &&
        grid[moveY][moveX] === plant
      ) {
        visited[y][x] = true;
        stack.push([moveX, moveY]);
        return true;
      }
    }).length;

    region.push(4 - score);
  }

  return region;
};

const solution = (input: string) => {
  const grid = splitLines(input).map((row) => row.split(''));
  const colLen = grid.length;
  const rowLen = grid[0].length;

  const regions: number[][] = [];
  const visited = Array(rowLen)
    .fill(false)
    .map(() => Array<boolean>(colLen).fill(false));

  grid.forEach((row, y) => {
    row.forEach((col, x) => {
      if (!visited[y][x]) {
        const region = bfs(grid, visited, [x, y]);
        if (region.length) regions.push(region);
      }
    });
  });

  return regions.reduce(
    (total, region) =>
      total + region.reduce((score, el) => score + el * region.length, 0),
    0,
  );
};

runner({
  path,
  solution: (input) => solution(input),
});
