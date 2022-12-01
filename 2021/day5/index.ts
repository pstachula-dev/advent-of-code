/* eslint-disable */
// @ts-nocheck
import { runner } from '../../legacy/utils';

interface Point {
  x: string;
  y: string;
}

type Matrix<T> = T[][];

// Helpers
const createMatrix = (size: number): Matrix<number> =>
  Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));

const parsePoints = (data: string[]) =>
  data.map((el) => {
    return el
      .replace(/[->]+/g, '')
      .split('  ')
      .map((el) => {
        const [x, y] = el.split(',');
        return { x, y };
      });
  });

// Solutions
const part1 = ({
  data,
  matrix,
}: {
  data: Matrix<Point>;
  matrix: Matrix<number>;
}) => {
  for (const [point1, point2] of data) {
    if (point1.x === point2.x) {
      const [min, max] = [point1.y, point2.y].sort().map((e) => parseInt(e));
      for (let i = min; i <= max; i++) matrix[i][point1.x]++;
    }

    if (point1.y === point2.y) {
      const [min, max] = [point1.x, point2.x].sort().map((e) => parseInt(e));
      for (let i = min; i <= max; i++) matrix[point1.y][i]++;
    }
  }
  return matrix.flat().filter((el) => el >= 2).length;
};

runner((text) => {
  const data = parsePoints(text);
  const matrix = createMatrix(10);
  return part1({ data, matrix });
}, './2021/day5/input.txt');
