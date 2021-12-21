import { readInput } from "../../utils.js";

const [input] = await readInput("./2021/day7/input.txt");
const data = input.split(",").map((e) => parseInt(e));

// P1
const part1 = (data) => {
  const dataSorted = [...data].sort((a, b) => a - b);
  const min = dataSorted.at(0);
  const max = dataSorted.at(-1);
  const range = max - min;
  const results = new Array(range).fill(0);

  for (let i = 0; i < range; i++) {
    data.forEach((el) => {
      results[i] += el >= i ? el - i : i - el;
    });
  }
  return results.sort((a, b) => a - b).at(0);
};

console.log("P1", part1(data));
