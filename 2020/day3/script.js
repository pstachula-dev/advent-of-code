import { readInput } from "../utils.js";

const data = await readInput("./2020/day3/input.js");
const treeChar = "#";

const part1 = ({ data, treeChar, step = 3 }) => {
  let index = 0;
  let result = 0;

  for (let row of data) {
    row[index] === treeChar && result++;
    index = (index + step) % row.length;
  }

  return result;
};

console.log("P1:", part1({ data, treeChar }));
