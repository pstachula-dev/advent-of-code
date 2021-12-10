import { readInput } from "../../utils.js";

const data = await readInput("./2021/day4/input.txt");

const getCol = (matrix, rowIndex) => {
  const col = [];
  for (let i = 0; i < matrix.length; i++) {
    col.push(matrix[i][rowIndex]);
  }
  return col;
};

const createBingoSets = (data) => {
  const bingoSets = [];
  let rows = [];

  const randomNumbers = data
    .shift()
    .split(",")
    .map((e) => parseInt(e));

  for (const [index, row] of data.entries()) {
    if (row !== "") {
      rows.push(
        row
          .split(" ")
          .filter((e) => e)
          .map((e) => parseInt(e))
      );
    }

    if (row === "" && rows.length) {
      bingoSets.push({ rows, bingoCounter: 0 });
      rows = [];
    }
  }

  return { randomNumbers, bingoSets };
};

const computeRow = (data, rows, randoms) => {
  if (data.every((el) => randoms.includes(el))) {
    return [
      data,
      rows
        .flat()
        .filter((el) => !randoms.includes(el))
        .reduce((a, b) => (a += b), 0) * randoms[randoms.length - 1],
    ];
  }
};

const { randomNumbers, bingoSets } = createBingoSets(data);

const part1 = ({ bingoSets, randomNumbers }) => {
  const randoms = [];
  for (let randomNumber of randomNumbers) {
    randoms.push(randomNumber);
    for (let table of bingoSets) {
      for (let [index, row] of Object.entries(table.rows)) {
        const col = getCol(table.rows, index);
        const rowIsWinner = computeRow(row, table.rows, randoms);
        const colIsWinner = computeRow(col, table.rows, randoms);
        if (rowIsWinner) return rowIsWinner;
        if (colIsWinner) return colIsWinner;
      }
    }
  }
};

console.log("P1", part1({ bingoSets, randomNumbers }));
