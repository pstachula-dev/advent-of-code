import { readInput } from "../../utils.js";

const data = (await readInput("./2021/day1/input.js")).map((e) => parseInt(e));

// P1
const part1 = (data) => data.filter((el, index) => el < data[index + 1]).length;
console.log("P1", part1(data));

// P2
const part2 = (data) => data.filter((el, index) => el < data[index + 1]).length;
console.log("P2", part2(data));
