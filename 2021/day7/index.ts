import { runner } from "../../utils";

// P1
const part1 = (data: number[]) => {
  const dataSorted = [...data].sort((a, b) => a - b);
  const min = dataSorted.at(0);
  const max = dataSorted.at(-1);
  const range = max - min;
  const results = new Array<number>(range).fill(0);

  for (let i = 0; i < range; i++) {
    data.forEach((el) => {
      results[i] += el >= i ? el - i : i - el;
    });
  }
  return results.sort((a, b) => a - b).at(0);
};

runner((input) => {
  const data = input
    .at(0)
    .split(",")
    .map((e) => parseInt(e));

  return part1(data);
}, "./2021/day7/input.txt");
