import { readInput } from "../../utils";

const data = (await readInput("./2020/day1/input.js")).map((e) => parseInt(e));

const part1 = (data, year) => {
  for (const i of data) {
    const val = data.find((j) => j + i === year);

    if (val) {
      return i * val;
    }
  }
};

console.log("Part1:", part1(data, 2020));

const part2 = (data, year) => {
  for (const i of data) {
    for (const j of data) {
      for (const k of data) {
        if (i + k + j === year) {
          return i * k * j;
        }
      }
    }
  }
};

console.log("Part2:", part2(data, 2020));
