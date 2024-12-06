import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const changeDirection = (dir: number) => {
  const newDir = dir + 90;
  return newDir === 360 ? 0 : newDir;
};

const getHasPosition = (char: string | undefined) => char !== undefined;

const p1 = (grid: string[][]) => {
  const xLen = grid[0].length;
  const yLen = grid.length;
  let direction = 0;
  let currPos: { x: number; y: number } = { x: 0, y: 0 };

  grid.find((row, y) =>
    row.find((el, x) => {
      if (el === '^') return (currPos = { x, y });
    }),
  );

  let hasPosition = true;
  let counter = 0;

  const logDashboard = () => {
    // console.log('Direction', globalCounter, direction, counter);
    // grid.forEach((row, i) => console.log(i, row.join(''), '\n'));
  };

  while (hasPosition) {
    if (direction === 0) {
      for (let y = currPos.y - 1; y >= -1; y--) {
        const area = grid[y]?.[currPos.x];

        if (area === '.') counter++;
        hasPosition = getHasPosition(area);
        if (!hasPosition) break;

        if (area === '#') {
          currPos.y = y + 1;
          direction = changeDirection(direction);
          logDashboard();
          break;
        }
        grid[y][currPos.x] = 'X';
      }
    }

    if (direction === 180) {
      for (let y = currPos.y + 1; y <= yLen; y++) {
        const area = grid[y]?.[currPos.x];

        if (area === '.') counter++;
        hasPosition = getHasPosition(area);
        if (!hasPosition) break;

        if (area === '#') {
          currPos.y = y - 1;
          direction = changeDirection(direction);
          logDashboard();
          break;
        }
        grid[y][currPos.x] = 'X';
      }
    }

    if (direction === 90) {
      for (let x = currPos.x + 1; x <= xLen; x++) {
        const area = grid[currPos.y][x];
        if (area === '.') counter++;

        hasPosition = getHasPosition(grid[currPos.y][x]);
        if (!hasPosition) break;

        if (area === '#') {
          currPos.x = x - 1;
          direction = changeDirection(direction);
          logDashboard();
          break;
        }
        grid[currPos.y][x] = 'X';
      }
    }

    if (direction === 270) {
      for (let x = currPos.x - 1; x >= -1; x--) {
        const area = grid[currPos.y][x];
        if (area === '.') counter++;

        hasPosition = getHasPosition(area);
        if (!hasPosition) break;

        if (area === '#') {
          currPos.x = x + 1;
          direction = changeDirection(direction);
          logDashboard();
          break;
        }
        grid[currPos.y][x] = 'X';
      }
    }
  }

  return counter + 1;
};

// TODO: fix me later
const simulateGuardMovement = (
  originalGrid: string[][],
  obstruction: { x: number; y: number },
): boolean => {
  const grid = originalGrid.map((row) => [...row]);
  grid[obstruction.y][obstruction.x] = '#';

  const xLen = grid[0].length;
  const yLen = grid.length;
  let direction = 0;
  let currPos: { x: number; y: number } = { x: 0, y: 0 };

  grid.find((row, y) =>
    row.find((el, x) => {
      if (el === '^') {
        return (currPos = { x, y });
      }
    }),
  );

  let hasPosition = true;
  const visitedStates = new Set<string>();

  while (hasPosition) {
    const stateKey = `${currPos.x},${currPos.y},${direction}`;

    if (visitedStates.has(stateKey)) {
      return true; // Guard is stuck in a loop
    }
    visitedStates.add(stateKey);

    if (direction === 0) {
      // Moving UP
      let foundWall = false;
      for (let y = currPos.y - 1; y >= 0; y--) {
        const area = grid[y]?.[currPos.x];

        if (!area) {
          hasPosition = false;
          break;
        }

        if (area === '#') {
          currPos.y = y + 1;
          direction = changeDirection(direction);
          foundWall = true;
          break;
        }
      }
      if (!foundWall) {
        hasPosition = false;
      }
    }

    if (direction === 180) {
      // Moving DOWN
      let foundWall = false;
      for (let y = currPos.y + 1; y < yLen; y++) {
        const area = grid[y]?.[currPos.x];

        if (!area) {
          hasPosition = false;
          break;
        }

        if (area === '#') {
          currPos.y = y - 1;
          direction = changeDirection(direction);
          foundWall = true;
          break;
        }
      }
      if (!foundWall) {
        hasPosition = false;
      }
    }

    if (direction === 90) {
      // Moving RIGHT
      let foundWall = false;
      for (let x = currPos.x + 1; x < xLen; x++) {
        const area = grid[currPos.y][x];

        if (!area) {
          hasPosition = false;
          break;
        }

        if (area === '#') {
          currPos.x = x - 1;
          direction = changeDirection(direction);
          foundWall = true;
          break;
        }
      }
      if (!foundWall) {
        hasPosition = false;
      }
    }

    if (direction === 270) {
      // Moving LEFT
      let foundWall = false;
      for (let x = currPos.x - 1; x >= 0; x--) {
        const area = grid[currPos.y][x];

        if (!area) {
          hasPosition = false;
          break;
        }

        if (area === '#') {
          currPos.x = x + 1;
          direction = changeDirection(direction);
          foundWall = true;
          break;
        }
      }
      if (!foundWall) {
        hasPosition = false;
      }
    }
  }

  return false; // Guard escaped or got stuck
};

const p2 = (grid: string[][]): number => {
  const xLen = grid[0].length;
  const yLen = grid.length;
  let loopPositions = 0;

  let guardStart: { x: number; y: number } = { x: 0, y: 0 };

  grid.find((row, y) =>
    row.find((el, x) => {
      if (el === '^') {
        guardStart = { x, y };
        return true;
      }
      return false;
    }),
  );

  // Try placing obstruction at every possible position
  for (let y = 0; y < yLen; y++) {
    for (let x = 0; x < xLen; x++) {
      if (
        (guardStart && x === guardStart.x && y === guardStart.y) ||
        grid[y][x] === '#'
      ) {
        continue;
      }

      // Check if this position creates a loop
      if (simulateGuardMovement(grid, { x, y })) {
        loopPositions++;
      }
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
