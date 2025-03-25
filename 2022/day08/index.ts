import { INPUT_PATH, runner, splitToFlatArray } from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const verticalCheck = (
  matrix: number[][],
  posX: number,
  posY: number,
  rowLastIndex: number,
  toPoint: boolean,
) => {
  const [i, limit] = toPoint ? [0, posY] : [posY, rowLastIndex];
  for (let index = i; index <= limit; index++) {
    if (index !== posY && matrix[posY][posX] <= matrix[index][posX]) {
      return false;
    }
  }

  return true;
};

const horizontalCheck = (
  matrix: number[][],
  posX: number,
  posY: number,
  rowLastIndex: number,
  toPoint: boolean,
) => {
  const [i, limit] = toPoint ? [0, posX] : [posX, rowLastIndex];
  for (let index = i; index <= limit; index++) {
    if (index !== posX && matrix[posY][posX] <= matrix[posY][index]) {
      return false;
    }
  }
  return true;
};

// Part 1
runner({
  path,
  solution: (input) => {
    const matrix = splitToFlatArray({ input }).map((row) =>
      row.split('').map((e) => Number.parseInt(e)),
    );

    const ROW_SIZE = matrix[0].length;
    const EDGE_TRESS = ROW_SIZE * 2 + (ROW_SIZE - 2) * 2;
    const ROW_LAST_INDEX = ROW_SIZE - 1;
    const result: number[] = [];

    matrix.forEach((row, posY) => {
      row.forEach((el, posX) => {
        if (posX !== 0 && posX < ROW_LAST_INDEX) {
          if (posY !== 0 && posY < ROW_LAST_INDEX) {
            if (
              verticalCheck(matrix, posX, posY, ROW_LAST_INDEX, true) ||
              verticalCheck(matrix, posX, posY, ROW_LAST_INDEX, false) ||
              horizontalCheck(matrix, posX, posY, ROW_LAST_INDEX, false) ||
              horizontalCheck(matrix, posX, posY, ROW_LAST_INDEX, true)
            ) {
              result.push(el);
            }
          }
        }
      });
    });

    return result.length + EDGE_TRESS;
  },
});

// Part 2

type DistanceProps = {
  matrix: number[][];
  posX: number;
  posY: number;
  lastIndex: number;
};

const distanceRight = ({ matrix, posX, posY, lastIndex }: DistanceProps) => {
  let distance = 0;
  for (let index = posX + 1; index <= lastIndex; index++) {
    if (matrix[posY][posX] > matrix[posY][index]) {
      distance++;
    } else {
      distance++;
      break;
    }
  }
  return distance;
};

const distanceLeft = ({ matrix, posX, posY, lastIndex }: DistanceProps) => {
  let distance = 0;
  for (let index = posX - 1; index >= 0; index--) {
    if (matrix[posY][posX] > matrix[posY][index]) {
      distance++;
    } else {
      distance++;
      break;
    }
  }
  return distance;
};

const distanceBottom = ({ matrix, posX, posY, lastIndex }: DistanceProps) => {
  let distance = 0;
  for (let index = posY + 1; index <= lastIndex; index++) {
    if (matrix[posY][posX] > matrix[index][posX]) {
      distance++;
    } else {
      distance++;
      break;
    }
  }
  return distance;
};

const distanceTop = ({ matrix, posX, posY, lastIndex }: DistanceProps) => {
  let distance = 0;
  for (let index = posY - 1; index >= 0; index--) {
    if (matrix[posY][posX] > matrix[index][posX]) {
      distance++;
    } else {
      distance++;
      break;
    }
  }
  return distance;
};

runner({
  path,
  solution: (input) => {
    const matrix = splitToFlatArray({ input }).map((row) =>
      row.split('').map((e) => Number.parseInt(e)),
    );
    const ROW_SIZE = matrix[0].length;
    const ROW_LAST_INDEX = ROW_SIZE - 1;
    const result: number[] = [];

    matrix.forEach((row, posY) => {
      row.forEach((_, posX) => {
        const right = distanceRight({
          matrix,
          posX,
          posY,
          lastIndex: ROW_LAST_INDEX,
        });
        const left = distanceLeft({
          matrix,
          posX,
          posY,
          lastIndex: ROW_LAST_INDEX,
        });
        const top = distanceTop({
          matrix,
          posX,
          posY,
          lastIndex: ROW_LAST_INDEX,
        });
        const bottom = distanceBottom({
          matrix,
          posX,
          posY,
          lastIndex: ROW_LAST_INDEX,
        });
        result.push(right * left * top * bottom);
      });
    });

    return result.sort((a, b) => b - a)[0];
  },
});
