import { runner } from "../../utils";

type Position = string[][];

enum POSITION {
  forward = "forward",
  down = "down",
  up = "up",
}

// P1
const part1 = (data: Position) => {
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
const part2 = (data: Position) => {
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
  const data = input.map((el) => el.split(" "));
  return part2(data);
}, "./2021/day2/input.txt");
