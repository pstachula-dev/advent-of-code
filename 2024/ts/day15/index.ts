/* eslint-disable no-fallthrough */
import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
  directions,
  debugGrid,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const WALL = '#';
const ROBOT = '@';
const BOX = 'O';
const EMPTY = '.';

const getDirection = (direction: string) => {
  switch (direction) {
    case '^':
      return directions[3];
    case 'v':
      return directions[2];
    case '>':
      return directions[1];
    case '<':
      return directions[0];
    default:
      return [0, 0];
  }
};

const canMove = (
  x: number,
  y: number,
  direction: string,
  map: string[][],
): [number, string] => {
  const defaultPos: [number, string] = [-1, ''];

  switch (direction) {
    case '^':
      for (let i = y; i >= 0; i--) {
        if (map[i][x] === WALL) return defaultPos;
        if (map[i][x] === EMPTY) return [i, 'y'];
      }
    case 'v':
      for (let i = y; i < map.length; i++) {
        if (map[i][x] === WALL) return defaultPos;
        if (map[i][x] === EMPTY) return [i, 'y'];
      }
    case '>':
      for (let i = x; i < map[0].length; i++) {
        if (map[y][i] === WALL) return defaultPos;
        if (map[y][i] === EMPTY) return [i, 'x'];
      }

    case '<':
      for (let i = x; i >= 0; i--) {
        if (map[y][i] === WALL) return defaultPos;
        if (map[y][i] === EMPTY) return [i, 'x'];
      }
  }

  return defaultPos;
};

const solution = (input: string) => {
  const [l1, l2] = input.split('\n\n');
  const map: string[][] = l1.split('\n').map((row) => row.split(''));
  const moves: string[] = l2.split('').slice(0, -1);
  const prevPos: number[] = [];

  map.find((row, idy) =>
    row.find((cell, idx) => (cell === ROBOT ? prevPos.push(idx, idy) : false)),
  );

  // debugGrid(map);

  const clearMap = (x: number, y: number) => (map[y][x] = EMPTY);
  const moveRobot = (x: number, y: number) => {
    map[y][x] = ROBOT;
    prevPos[0] = x;
    prevPos[1] = y;
  };

  for (const move of moves) {
    const [x, y] = getDirection(move);
    const [px, py] = prevPos;
    const rx = x + px;
    const ry = y + py;
    const afterMove = map[ry][rx];

    if (afterMove === EMPTY) {
      clearMap(px, py);
      moveRobot(rx, ry);
    }

    if (afterMove === BOX) {
      const [emptyPos, axis] = canMove(px, py, move, map);

      if (emptyPos !== -1) {
        clearMap(px, py);
        moveRobot(rx, ry);
        if (axis === 'y') map[emptyPos][rx] = BOX;
        if (axis === 'x') map[ry][emptyPos] = BOX;
      }
    }

    // console.log('move: ', move);
    // debugGrid(map);
  }

  let sum = 0;

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === BOX) sum += y * 100 + x;
    });
  });

  return sum;
};

runner({
  path,
  solution: (input) => solution(input),
});
