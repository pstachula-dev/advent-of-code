import { runner } from "../../utils";

// Part 1
runner((input) => {
  const data = input.map((e) => parseInt(e));
  let max = 0;
  let tmpMax = 0;

  data.forEach(el => {
    if (!el) {
      max = tmpMax >= max ? tmpMax : max;
      tmpMax = 0;
    } else {
      tmpMax += el;
    }
  });
  
  return max;
}, "./2022/day1/input.txt", 'time', '\n');

// Part 2
runner((input) => {
  const data = input.map((e) => parseInt(e));
  let max = [];
  let tmpMax = 0;

  data.forEach(el => {
    if (!el) {
      max.push(tmpMax);
      tmpMax = 0;
    } else {
      tmpMax += el;
    }
  });

  return max
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce((a, b) => a + b, 0);
}, "./2022/day1/input.txt");
