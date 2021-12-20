import { readInput } from "../../utils.js";

const input = await readInput("./2021/day6/input.txt");
const data = input[0].split(",").map((e) => parseInt(e));

const MIN_STATE = 0;
const MAX_STATE = 6;
const NEW_STATE = 8;
const DAYS = 80;

// P1
const part1 = (initData) => {
  let result = initData;

  for (let i = 0; i < DAYS; i++) {
    result = [
      ...result.map((el) => (el > MIN_STATE ? el - 1 : MAX_STATE)),
      ...result.filter((e) => e === MIN_STATE).map((e) => NEW_STATE),
    ];
  }

  return result.length;
};

console.log("P1", part1(data));
