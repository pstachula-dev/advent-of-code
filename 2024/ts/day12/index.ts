import { isRegExp } from 'es-toolkit';
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

const directionsDiagonal = [
  // Top-left
  [
    [-1, 0],
    [-1, 1],
    [0, 1],
  ],
  // Top-right
  [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  // Bottom-right
  [
    [1, 0],
    [1, -1],
    [0, -1],
  ],
  // Bottom-left
  [
    [0, -1],
    [-1, -1],
    [-1, 0],
  ],
];

const bfs = (grid: string[][], visited: boolean[][], start: Node) => {
  const rowLen = grid.length;
  const colLen = grid[0].length;
  const stack: Node[] = [start];
  const region: number[] = [];

  while (stack.length) {
    // It will never be null
    const [x, y] = stack.shift()!;

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

const findDiaglonal = (
  x: number,
  y: number,
  xMax: number,
  yMax: number,
  grid: string[][],
  corners: Set<string>,
) => {
  const plant = grid[y][x];

  // outer
  directionsDiagonal.forEach((diagonal, idx) => {
    if (
      diagonal.every(([dx, dy], i) => {
        const moveX = x + dx;
        const moveY = y + dy;
        return i % 2 === 0 ? grid[moveY]?.[moveX] !== plant : true;
      })
    ) {
      const [dx, dy] = diagonal[0];
      corners.add(`${idx}:${x + dx}:${y + dy}`);
    }
  });

  // inter
  directionsDiagonal.forEach((diagonal, idx) => {
    if (
      diagonal.every(([dx, dy], idx) => {
        const moveX = x + dx;
        const moveY = y + dy;

        if (moveX >= 0 && moveY >= 0 && moveX < xMax && moveY < yMax) {
          const move = grid[moveY][moveX];
          return idx % 2 === 0 ? move === plant : move !== plant;
        }
      })
    ) {
      const [dx, dy] = diagonal[0];
      corners.add(`${idx}:${x + dx}:${y + dy}`);
    }
  });
};

const bfsSides = (grid: string[][], visited: boolean[][], start: Node) => {
  const rowLen = grid.length;
  const colLen = grid[0].length;
  const stack: Node[] = [start];
  const corners = new Set<string>();
  const region: number[] = [];
  const [startX, startY] = start;
  const rootPlan = grid[startY][startX];
  let score = 0;

  // Check start node
  findDiaglonal(startX, startY, colLen, rowLen, grid, corners);

  // Check children
  while (stack.length) {
    // It will never be null
    const [x, y] = stack.shift()!;

    if (visited[y][x]) continue;

    const plant = grid[y][x];
    score++;

    directions.filter(([dx, dy]) => {
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
        findDiaglonal(x, y, colLen, rowLen, grid, corners);
      }
    });
  }

  region.push(score, corners.size);

  return region;
};

const solution = (
  input: string,
  search: (grid: string[][], visited: boolean[][], start: Node) => number[],
) => {
  const grid = splitLines(input).map((row) => row.split(''));
  const colLen = grid.length;
  const rowLen = grid[0].length;

  const regions: number[][] = [];
  const visited = Array(rowLen)
    .fill(false)
    .map(() => Array<boolean>(colLen).fill(false));

  grid.forEach((row, y) => {
    row.forEach((_, x) => {
      if (!visited[y][x]) {
        const region = search(grid, visited, [x, y]);

        if (region.length > 0) {
          regions.push(region);
        }
      }
    });
  });

  return regions;
};

runner({
  path,
  solution: (input) => {
    return solution(input, bfs).reduce(
      (total, region) =>
        total + region.reduce((score, el) => score + el * region.length, 0),
      0,
    );
  },
});

runner({
  path,
  solution: (input) => {
    return solution(input, bfsSides).reduce(
      (acc, [area, sides]) => acc + area * sides,
      0,
    );
  },
});
