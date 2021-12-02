import { readInput } from "../../utils.js";

const data = (await readInput("./2021/day2/input.js")).map((el) =>
  el.split(" ")
);

const POSITION = {
  forward: "forward",
  down: "down",
  up: "up",
};

// P1
const part1 = (data) => {
  let depth = 0;
  let horizontal = 0;

  for (const [pos, val] of data) {
    const intVal = parseInt(val);
    switch (pos) {
      case POSITION.down:
        depth += intVal;
        break;
      case POSITION.up:
        depth -= intVal;
        break;
      case POSITION.forward:
        horizontal += intVal;
        break;
      default:
        break;
    }
  }

  return depth * horizontal;
};

console.log("P1", part1(data));

// P2
const part2 = (data) => {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  for (const [pos, val] of data) {
    const intVal = parseInt(val);
    switch (pos) {
      case POSITION.down:
        aim += intVal;
        break;
      case POSITION.up:
        aim -= intVal;
        break;
      case POSITION.forward:
        horizontal += intVal;
        depth += intVal * aim;
        break;
      default:
        break;
    }
  }

  return depth * horizontal;
};

console.log("P2", part2(data));
