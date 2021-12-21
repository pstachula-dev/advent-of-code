import { runner } from "../../utils";

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

runner((input) => {
  return part1(input.map((el) => el.split(" ")));
}, "./2021/day2/input.txt");

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

runner((input) => {
  return part2(input.map((el) => el.split(" ")));
}, "./2021/day2/input.txt");
