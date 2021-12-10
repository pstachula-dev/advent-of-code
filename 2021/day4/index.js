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

  for (const row of data) {
    if (row !== "") {
      rows.push(
        row
          .split(" ")
          .filter(Boolean)
          .map((e) => parseInt(e))
      );
    }

    if (row === "" && rows.length) {
      bingoSets.push({ rows });
      rows = [];
    }
  }

  return { randomNumbers, bingoSets };
};

const checkRandomsWithArray = (data, rows, randoms) => {
  if (data.every((el) => randoms.includes(el))) {
    return (
      rows
        .flat()
        .filter((el) => !randoms.includes(el))
        .reduce((a, b) => (a += b), 0) * randoms.at(-1)
    );
  }
};

const { randomNumbers, bingoSets } = createBingoSets(data);

// PART1
const part1 = ({ bingoSets, randomNumbers }) => {
  const randomQueue = [];
  for (let randomNumber of randomNumbers) {
    randomQueue.push(randomNumber);
    for (let { rows } of bingoSets) {
      for (let [index, row] of Object.entries(rows)) {
        const col = getCol(rows, index);
        const rowIsWinner = checkRandomsWithArray(row, rows, randomQueue);
        const colIsWinner = checkRandomsWithArray(col, rows, randomQueue);
        if (rowIsWinner) return rowIsWinner;
        if (colIsWinner) return colIsWinner;
      }
    }
  }
};

console.log("P1", part1({ bingoSets, randomNumbers }));

// PART2
const part2 = ({ bingoSets, randomNumbers }) => {
  const winnerTable = new Set();
  const randomQueue = [];
  for (let randomNumber of randomNumbers) {
    randomQueue.push(randomNumber);
    for (let { rows } of bingoSets) {
      for (let [index, row] of Object.entries(rows)) {
        const col = getCol(rows, index);
        const rowIsWinner = checkRandomsWithArray(row, rows, randomQueue);
        const colIsWinner = checkRandomsWithArray(col, rows, randomQueue);
        if (rowIsWinner || colIsWinner) {
          winnerTable.add(rows);
          if (winnerTable.size === bingoSets.length) {
            const lastBoard = [...winnerTable].at(-1);
            return (
              lastBoard
                .flat()
                .filter((el) => !randomQueue.includes(el))
                .reduce((a, b) => (a += b), 0) * randomQueue.at(-1)
            );
          }
        }
      }
    }
  }
};

console.log("P2", part2({ bingoSets, randomNumbers }));
