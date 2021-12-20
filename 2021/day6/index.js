import { readInput } from "../../utils.js";

const input = await readInput("./2021/day6/input.txt");
const data = input[0].split(",").map((e) => parseInt(e));

const MIN_STATE = 0;
const MAX_STATE = 6;
const NEW_STATE = 9;
const DAYS = 18;

// P1
const part1 = (initData) => {
  let result = new Map(Object.entries(initData));

  for (let i = 0; i < DAYS; i++) {
    result.forEach((el, index) => {
      if (el === MIN_STATE) {
        result.set(result.size, NEW_STATE);
      }
      result.set(index, el > MIN_STATE ? el - 1 : MAX_STATE);
    });
  }

  return result.size;
};

console.log("P1", part1(data));
