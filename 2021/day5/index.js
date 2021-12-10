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

const matrix = createMatrix(1000);
const data = parsePoints(text);

// P1
// ------------------------------------------------------------------------------
const part1 = ({ data, matrix }) => {
  for (const [point1, point2] of data) {
    if (point1.x === point2.x) {
      const min = Math.min(point1.y, point2.y);
      const max = Math.max(point1.y, point2.y);
      for (let i = min; i <= max; i++) matrix[point1.x][i]++;
    }

    if (point1.y === point2.y) {
      const min = Math.min(point1.x, point2.x);
      const max = Math.max(point1.x, point2.x);
      for (let i = min; i <= max; i++) matrix[i][point1.y]++;
    }
  }

  return matrix.flat().filter((el) => el >= 2).length;
};

console.log("P1", part1({ data, matrix }));

// P2
// ------------------------------------------------------------------------------
const part2 = (data) => {};

console.log("P2", part2(data));
