import { readInput } from "../../utils.js";

const text = await readInput("./2021/day5/input.txt");

// Helpers
// ------------------------------------------------------------------------------
const createMatrix = (size) =>
  Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));

const parsePoints = (data) =>
  data.map((el) => {
    return el
      .replace(/[->]+/g, "")
      .split("  ")
      .map((el) => {
        const [x, y] = el.split(",");
        return { x, y };
      });
  });

const matrix1 = createMatrix(10);
const data = parsePoints(text);

// P1
// ------------------------------------------------------------------------------
const part1 = ({ data, matrix }) => {
  for (const [point1, point2] of data) {
    if (point1.x === point2.x) {
      const [min, max] = [point1.y, point2.y].sort();
      for (let i = min; i <= max; i++) matrix[i][point1.x]++;
    }

    if (point1.y === point2.y) {
      const [min, max] = [point1.x, point2.x].sort();
      for (let i = min; i <= max; i++) matrix[point1.y][i]++;
    }
  }
  return matrix.flat().filter((el) => el >= 2).length;
};

console.log("P1", part1({ data, matrix: matrix1 }));

// P2 FIXME: ...
// ------------------------------------------------------------------------------
const part2 = ({ data, matrix }) => {
  for (const [point1, point2] of data) {
    if (point1.x === point2.x) {
      const [min, max] = [point1.y, point2.y].sort();
      // for (let i = min; i <= max; i++) matrix[i][point1.x]++;
    }

    if (point1.y === point2.y) {
      const [min, max] = [point1.x, point2.x].sort();
      // for (let i = min; i <= max; i++) matrix[point1.y][i]++;
    }

    if (point1.y !== point2.y || point1.x !== point2.x) {
      console.log(point1, point2);

      for (let i = minY; i <= maxY; i++) {
        for (let j = minX; j <= maxX; j++) {
          if (i === j) {
            matrix[i][j]++;
          }
        }
      }
    }
  }

  console.log(matrix.map((el) => el.join()));

  return matrix.flat().filter((el) => el >= 2).length;
};

const matrix2 = createMatrix(10);
console.log("P2", part2({ data, matrix: matrix2 }));
