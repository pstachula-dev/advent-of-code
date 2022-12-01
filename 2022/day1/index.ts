import { runner, splitIntoGroups } from "../../lib/utils";

// Part 1
runner({
  path: "./2022/day1/input.txt",
  callback: (input) => {
    const data = splitIntoGroups<number>({
      input,
      parser: (e) => Number(e)
    });

    return Math.max(...data.map((group) => group.reduce((a, b) => a + b, 0)))
  },
});

// Part 2
runner({
  path: "./2022/day1/input.txt",
  callback: (input) => {
    const data = splitIntoGroups<number>({
      input,
      parser: (e) => Number(e)
    });

    return data
      .map((group) => group.reduce((a, b) => a + b, 0))
      .sort((a , b) => b - a)
      .splice(0 ,3)
      .reduce((a, b) => a + b, 0);
  },
});
