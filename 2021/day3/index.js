import { readInput } from "../../utils.js";

const data = (await readInput("./2021/day3/input.txt")).map(
  (el) => el.split("\n")[0]
);

// P1
const part1 = (data) => {
  const result = [];
  let gamma = "";
  let epsilon = "";
  const middleLength = Math.floor(data.length / 2);

  data.forEach((row) => {
    [...row].forEach((col, colIndex) => {
      if (result[colIndex] === undefined) {
        result[colIndex] = 0;
      } else {
        result[colIndex] += parseInt(col);
      }
    });
  });

  for (const val of Object.values(result)) {
    gamma += `${val >= middleLength ? 1 : 0}`;
    epsilon += `${val < middleLength ? 1 : 0}`;
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

console.log("P1", part1(data));

// P2
const part2 = (data, start = 0) => {
  const result = [];
  const temp = [];

  data.forEach((row) => {
    [...row[start]].forEach((col) => {
      result.push(col);
    });
  });

  const isMoreOnes =
    result.filter((e) => e === "1").length >=
    result.filter((e) => e === "0").length;

  data.forEach((row) => {
    if (isMoreOnes && row[start] === "1") {
      temp.push(row);
    } else if (!isMoreOnes && row[start] === "0") {
      temp.push(row);
    }
  });

  if (temp.length === 1) {
    console.log(parseInt(temp[0], 2));
    return;
  }

  part2(temp, start + 1);
};

const part2b = (data, start = 0) => {
  const result = [];
  const temp = [];

  data.forEach((row) => {
    [...row[start]].forEach((col) => {
      result.push(col);
    });
  });

  const isLessOnes =
    result.filter((e) => e === "1").length <
    result.filter((e) => e === "0").length;

  data.forEach((row) => {
    if (isLessOnes && row[start] === "1") {
      temp.push(row);
    } else if (!isLessOnes && row[start] === "0") {
      temp.push(row);
    }
  });

  if (temp.length === 1) {
    console.log(parseInt(temp[0], 2));
    return;
  }

  part2b(temp, start + 1);
};

// TODO: refactor...
part2(data);
part2b(data);
