import { readInput } from "../../utils.js";

const data = (await readInput("./2021/day3/input.txt")).map(
  (el) => el.split("\n")[0]
);

const part1 = (data) => {
  const result = [];
  let gamma = "";
  let epsilon = "";
  const halfPowerLength = Math.floor(data.length / 2);

  data.forEach((row) => {
    [...row].forEach((col, colIndex) => {
      if (result[colIndex] === undefined) {
        result[colIndex] = 0;
      } else {
        result[colIndex] += parseInt(col);
      }
    });
  });

  for (const val of Object.values(result)) {
    gamma += `${val >= halfPowerLength ? 1 : 0}`;
    epsilon += `${val < halfPowerLength ? 1 : 0}`;
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

console.log("P1", part1(data));
