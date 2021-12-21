import { runner } from "../../utils";

// P1
const part1 = (data) => data.filter((el, index) => el < data[index + 1]).length;

runner((input) => {
  return part1(input.map((e) => parseInt(e)));
}, "./2021/day1/input.txt");

// P2
const sumArray = (data, index, movePointer = 0) =>
  data
    .slice(index + movePointer, index + 3 + movePointer)
    .reduce((a, b) => a + b, 0);

const part2 = (data) => {
  return data.filter((_, i) => sumArray(data, i) < sumArray(data, i, 1)).length;
};

runner((input) => {
  return part2(input.map((e) => parseInt(e)));
}, "./2021/day1/input.txt");
