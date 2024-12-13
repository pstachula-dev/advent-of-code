import { join } from 'path/win32';
import {
  INPUT_PATH,
  runner,
  directions,
  SAMPLE_PATH,
  splitLines,
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

// Przepisz od zera z glowy
const dfs = (grid: Grid, start: Node, end: number, visitOnce: boolean) => {
  let score = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const visitedEnds = new Set<string>();
  const visited = Array(rows)
    .fill(false)
    .map(() => Array<boolean>(cols).fill(false));

  const stack: Node[] = [start];

  while (stack.length) {
    const node = stack.pop();

    if (!node) throw Error('Missing node!');

    const [x, y, path] = node;

    if (grid[y][x] === end) {
      if (visitOnce) visitedEnds.add(`${x}${y}`);
      score++;
    }

    if (!visited[y][x]) {
      for (const [dx, dy] of directions) {
        const moveY = y + dy;
        const moveX = x + dx;

        const hasMovement =
          moveX >= 0 && moveX < cols && moveY >= 0 && moveY < rows;

        if (hasMovement && grid[moveY][moveX] - grid[y][x] === 1) {
          if (visitOnce ? !visitedEnds.has(`${moveX}${moveY}`) : true) {
            stack.push([moveX, moveY, [...path, [moveX, moveY]]]);
          }
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
    (acc, [x, y]) => acc + dfs(grid, [x, y, []], 9, visitOnce),
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
