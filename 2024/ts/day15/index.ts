/* eslint-disable no-fallthrough */
import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  directions,
  debugGrid,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const WALL = '#';
const ROBOT = '@';
const BOX = 'O';
const BOX_LEFT = '[';
const BOX_RIGHT = ']';
const EMPTY = '.';
const defaultPos: [number, string] = [-1, ''];

const isBox = (s: string) => [BOX_LEFT, BOX_RIGHT].includes(s);

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

const checkAxisY = (
  x: number,
  y: number,
  shift: number,
  map: string[][],
): [number, string] => {
  if (map[y][x] === BOX_RIGHT) {
    if (shift === -1) {
      for (let i = y + shift; i > 0; i--) {
        if (
          (map[i][x] !== BOX_RIGHT && map[i][x] !== EMPTY) ||
          map[i][x + 1] !== EMPTY
        ) {
          return defaultPos;
        }
      }
      return map[y - 1][x] === WALL ? defaultPos : [y, 'y'];
    } else {
      for (let i = y + shift; i < map.length - 1; i++) {
        if (
          (map[i][x] !== BOX_RIGHT && map[i][x] !== EMPTY) ||
          map[i][x + 1] !== EMPTY
        ) {
          return defaultPos;
        }
      }
      return map[y + 1][x] === WALL ? defaultPos : [y, 'y'];
    }
  }

  if (map[y][x] === BOX_LEFT) {
    if (shift === -1) {
      for (let i = y + shift; i > 0; i--) {
        if (
          map[i][x] !== BOX_LEFT ||
          map[i][x] !== EMPTY ||
          map[i][x + 1] !== EMPTY
        ) {
          console.log('el', map[i][x], map[i][x + 1]);
          return defaultPos;
        }
      }
      return map[y - 1][x] === WALL ? defaultPos : [y, 'y'];
    } else {
      for (let i = y + shift; i < map.length - 1; i++) {
        if (
          (map[i][x] !== BOX_LEFT && map[i][x] !== EMPTY) ||
          map[i][x + 1] !== EMPTY
        ) {
          return defaultPos;
        }
      }
      return map[y + 1][x] === WALL ? defaultPos : [y, 'y'];
    }
  }

  return defaultPos;
};

const canMove = (
  x: number,
  y: number,
  direction: string,
  map: string[][],
): [number, string] => {
  switch (direction) {
    case '^':
      for (let i = y; i >= 0; i--) {
        // Bug not full Y Axis
        if (map[i][x] === WALL) return defaultPos;
        if (map[i][x] === EMPTY) return [i, 'y'];
        if (isBox(map[i][x])) return checkAxisY(x, i, -1, map);
      }
    case 'v':
      for (let i = y; i < map.length; i++) {
        if (map[i][x] === WALL) return defaultPos;
        if (map[i][x] === EMPTY) return [i, 'y'];
        if (isBox(map[i][x])) return checkAxisY(x, i, 1, map);
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

const resizeMap = (map: string[][]) => {
  const newMap: string[][] = [];

  map.forEach((row, y) => {
    newMap.push([]);
    row.forEach((cell) => {
      if (cell === WALL || cell === EMPTY) {
        newMap[y].push(cell, cell);
      } else if (cell === BOX) {
        newMap[y].push(BOX_LEFT, BOX_RIGHT);
      } else if (cell === ROBOT) {
        newMap[y].push(cell, '.');
      } else {
        newMap[y].push(cell);
      }
    });
  });

  return newMap;
};

const parse = (input: string) => {
  const [l1, l2] = input.split('\n\n');
  const moves: string[] = l2.split('').slice(0, -1);
  const map = l1.split('\n').map((row) => row.split(''));
  return { map, moves };
};

const solution2 = (input: string) => {
  const { map: rawMap, moves } = parse(input);
  const map = resizeMap(rawMap);
  const prevPos: number[] = [];

  map.find((row, idy) =>
    row.find((cell, idx) => (cell === ROBOT ? prevPos.push(idx, idy) : false)),
  );

  const clearMap = (x: number, y: number) => (map[y][x] = EMPTY);
  const moveRobot = (x: number, y: number) => {
    map[y][x] = ROBOT;
    prevPos[0] = x;
    prevPos[1] = y;
  };
  debugGrid(map);

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

    if (isBox(afterMove)) {
      const [emptyPos] = canMove(px, py, move, map);

      console.log('emptyPos', emptyPos);

      if (emptyPos !== -1) {
        clearMap(px, py);

        if (move === '^') {
          const isRight = map[ry][rx] === BOX_RIGHT;
          const [shift1, shift2] = isRight ? [rx - 1, rx] : [rx, rx + 1];

          for (let i = emptyPos; i <= ry; i++) {
            if (!isBox(map[i][rx])) continue;
            map[i - 1][shift1] = map[i][shift1];
            map[i - 1][shift2] = map[i][shift2];
          }

          moveRobot(rx, ry);
          map[ry][isRight ? rx - 1 : rx + 1] = EMPTY;
        }

        if (move === 'v') {
          const isRight = map[ry][rx] === BOX_RIGHT;
          const [shift1, shift2] = isRight ? [rx - 1, rx] : [rx, rx + 1];

          for (let i = emptyPos; i > 0; i--) {
            if (!isBox(map[i][rx])) continue;
            console.log('el', map[i][shift1], map[i][shift2]);
            console.log('el1', map[i + 1][shift1], map[i + 1][shift2]);

            map[i + 1][shift1] = map[i][shift1];
            map[i + 1][shift2] = map[i][shift2];
          }

          moveRobot(rx, ry);
          map[ry][isRight ? rx - 1 : rx + 1] = EMPTY;
        }

        if (move === '<') {
          map[ry] = [
            ...map[ry].slice(0, emptyPos - 1),
            ...map[ry].slice(emptyPos, rx + 1),
            '.',
            ...map[ry].slice(rx + 1),
          ];
          moveRobot(rx, ry);
        }

        if (move === '>') {
          map[ry] = [
            ...map[ry].slice(0, rx - 1),
            '.',
            ...map[ry].slice(rx - 1, emptyPos),
            ...map[ry].slice(emptyPos + 1),
          ];
          moveRobot(rx, ry);
        }
      }
    }

    console.log('move: ', move);
    debugGrid(map);
  }

  let sum = 0;

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === BOX) sum += y * 100 + x;
    });
  });

  return sum;
};

const solution = (input: string) => {
  const { map, moves } = parse(input);
  const prevPos: number[] = [];

  map.find((row, idy) =>
    row.find((cell, idx) => (cell === ROBOT ? prevPos.push(idx, idy) : false)),
  );

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

// TODO: fix part2 later :(
runner({
  path,
  solution: (input) => solution(input),
});
