/* eslint-disable no-constant-condition */
import {
  debugGrid,
  findGridPos,
  getGrid,
  INPUT_PATH,
  directions,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type Grid = string[][];
type Point = [number, number];

const START = 'S';
const END = 'E';

function dijkstra(
  grid: Grid,
  [sx, sy]: Point,
  [ex, ey]: Point,
  wallChar = '#',
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const distances = getGrid(rows, cols, Infinity);
  const previous = getGrid<Point | null>(rows, cols, null);
  const prevDirections = getGrid<Point | null>(rows, cols, null);
  const visited = getGrid(rows, cols, false);

  distances[sy][sx] = 0;

  while (true) {
    let minDistance = Infinity;
    let current: Point | null = null;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!visited[i][j] && distances[i][j] < minDistance) {
          minDistance = distances[i][j];
          current = [j, i];
        }
      }
    }

    if (!current || (current[1] === ey && current[0] === ex)) break;

    const [x, y] = current || [];
    visited[y][x] = true;

    for (const [idx, [dx, dy]] of directions.entries()) {
      const newRow = y + dx;
      const newCol = x + dy;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        grid[newRow][newCol] !== wallChar
      ) {
        const currentDirection = prevDirections[y][x];
        let distance = distances[y][x] + 1;

        if (
          currentDirection !== null &&
          (currentDirection[1] !== dy || currentDirection[0] !== dx)
        ) {
          distance += 1000;
        }

        if (distance < distances[newRow][newCol]) {
          distances[newRow][newCol] = distance;
          previous[newRow][newCol] = current;
          prevDirections[newRow][newCol] = [dx, dy];
        }
      }
    }
  }

  const path: Point[] = [];
  let current: Point | null = [ex, ey];

  if (distances[ey][ex] === Infinity) {
    return { distance: -1, path: [] };
  }

  while (current !== null) {
    path.unshift(current);
    current = previous[current[1]][current[0]];
  }

  return {
    distance: distances[ey][ex],
    path: path,
  };
}

const solution = (input: string) => {
  const grid = splitLines(input).map((line) => line.split(''));
  const start = findGridPos(grid, START);
  const end = findGridPos(grid, END);

  const result = dijkstra(grid, [start.x, start.y], [end.x, end.y]);

  result.path.forEach(([x, y]) => {
    grid[y][x] = 'O';
  });

  // debugGrid(grid);

  return result.distance + 1000;
};

runner({
  path,
  solution: (input) => solution(input),
});
