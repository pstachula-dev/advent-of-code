import {
  INPUT_PATH,
  runner,
  directions,
  SAMPLE_PATH,
  splitLines,
  getGrid,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type Grid = number[][];
type Node = [number, number, number[][]];

const getStarts = (grid: Grid) => {
  const starts: [number, number][] = [];
  grid.forEach((row, y) => {
    row.filter((cell, x) => {
      if (cell === 0) starts.push([x, y]);
    });
  });

  return starts;
};

const bfs = (grid: Grid, start: Node, end: number, visitOnce: boolean) => {
  let score = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = getGrid(rows, cols, false);

  const stack: Node[] = [start];

  while (stack.length) {
    const [x, y, path] = stack.shift()!;

    if (grid[y][x] === end) {
      score++;
    }

    for (const [dx, dy] of directions) {
      const ny = y + dy;
      const nx = x + dx;

      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        if (visitOnce && visited[ny][nx]) continue;

        if (grid[ny][nx] - grid[y][x] === 1) {
          visited[ny][nx] = true;
          stack.push([nx, ny, [...path, [nx, ny]]]);
        }
      }
    }
  }

  return score;
};

const solution = ({
  input,
  visitOnce,
}: {
  input: string;
  visitOnce: boolean;
}) => {
  const grid = splitLines(input).map((row) => row.split('').map(Number));

  return getStarts(grid).reduce(
    (acc, [x, y]) => acc + bfs(grid, [x, y, []], 9, visitOnce),
    0,
  );
};

runner({
  path,
  solution: (input) => {
    return solution({ input, visitOnce: true });
  },
});

runner({
  path,
  solution: (input) => {
    return solution({ input, visitOnce: false });
  },
});
