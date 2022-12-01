import { runner } from "../../legacy/utils";

// P1
const part1 = (data: number[]) =>
  data.filter((el, index) => el < data[index + 1]).length;

runner((input) => {
  const data = input.map((e) => parseInt(e));
  return part1(data);
}, "./2021/day1/input.txt");

// P2
const sumArray = (data: number[], index: number, movePointer: number = 0) =>
  data
    .slice(index + movePointer, index + 3 + movePointer)
    .reduce((a, b) => a + b, 0);

const part2 = (data: number[]) => {
  return data.filter((_, i) => sumArray(data, i) < sumArray(data, i, 1)).length;
};

runner((input) => {
  const data = input.map((e) => parseInt(e));
  return part2(data);
}, "./2021/day1/input.txt");
