import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type Config = {
  hasPos: boolean;
  counter: number;
  direction: number;
  visited: Set<string>;
};

type CurrentPos = {
  x: number;
  y: number;
};

const changeDirection = (config: Config) => {
  const newDir = config.direction + 90;
  config.direction = newDir === 360 ? 0 : newDir;
};

const getVisitedPos = (currPos: CurrentPos, config: Config) =>
  `${currPos.x}-${currPos.y}-${config.direction}`;

const checkPosition = (
  area: string | undefined,
  config: Config,
  currPos: CurrentPos,
) => {
  config.hasPos = area !== undefined;
  if (area === '.') config.counter++;
  if (!config.hasPos || area === '') return true;
  if (area === '#') {
    changeDirection(config);
    return true;
  }
};

const p1 = (gridSource: string[][], x?: number, y?: number) => {
  const grid = gridSource.map((r) => [...r]);
  const xLen = grid[0].length;
  const yLen = grid.length;
  let currPos: CurrentPos = { x: 0, y: 0 };

  if (x && y) {
    grid[y][x] = '#'; // set O
  }

  grid.find((row, y) =>
    row.find((el, x) => {
      if (el === '^') {
        return (currPos = { x, y });
      }
    }),
  );

  const config: Config = {
    hasPos: true,
    counter: 0,
    direction: 0,
    visited: new Set(),
  };

  while (config.hasPos) {
    if (config.visited.has(getVisitedPos(currPos, config))) {
      return true;
    }
    config.visited.add(getVisitedPos(currPos, config));

    if (config.direction === 0) {
      for (let y = currPos.y - 1; y >= -1; y--) {
        const area = grid[y]?.[currPos.x];
        currPos.y = y + 1;

        if (checkPosition(area, config, currPos)) break;
      }
    }

    if (config.direction === 180) {
      for (let y = currPos.y + 1; y <= yLen; y++) {
        const area = grid[y]?.[currPos.x];
        currPos.y = y - 1;

        if (checkPosition(area, config, currPos)) break;
      }
    }

    if (config.direction === 90) {
      for (let x = currPos.x + 1; x <= xLen; x++) {
        const area = grid[currPos.y][x];
        currPos.x = x - 1;

        if (checkPosition(area, config, currPos)) break;
      }
    }

    if (config.direction === 270) {
      for (let x = currPos.x - 1; x >= -1; x--) {
        const area = grid[currPos.y][x];
        currPos.x = x + 1;

        if (checkPosition(area, config, currPos)) break;
      }
    }
  }

  return false;
};

const p2 = (grid: string[][]): number => {
  const xLen = grid[0].length;
  const yLen = grid.length;
  let loopPositions = 0;

  let guardStart: { x: number; y: number } = { x: 0, y: 0 };

  grid.find((row, y) =>
    row.find((el, x) => {
      if (el === '^') {
        return (guardStart = { x, y });
      }
    }),
  );

  for (let y = 0; y < yLen; y++) {
    for (let x = 0; x < xLen; x++) {
      if (
        (guardStart && x === guardStart.x && y === guardStart.y) ||
        grid[y][x] === '#' // => O
      ) {
        continue;
      }

      if (p1(grid, x, y)) loopPositions++;
    }
  }

  return loopPositions;
};

runner({
  path,
  solution: (input) => {
    const lines = splitLines(input).map((row) => row.split(''));

    return { p2: p2(lines) };
  },
});
