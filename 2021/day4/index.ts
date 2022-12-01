/* eslint-disable */
// @ts-nocheck
import { runner } from '../../legacy/utils';

const getCol = (matrix: string | any[], rowIndex: string) => {
  const col = [];
  for (let i = 0; i < matrix.length; i++) {
    col.push(matrix[i][rowIndex]);
  }
  return col;
};

const createBingoSets = (data: string[]) => {
  const bingoSets = [];
  let rows = [];

  const randomNumbers = data
    .shift()
    .split(',')
    .map((e: string) => parseInt(e));

  for (const row of data) {
    if (row !== '') {
      rows.push(
        row
          .split(' ')
          .filter(Boolean)
          .map((e: string) => parseInt(e)),
      );
    }

    if (row === '' && rows.length) {
      bingoSets.push({ rows });
      rows = [];
    }
  }

  return { randomNumbers, bingoSets };
};

const checkRandomsWithArray = (data: unknown, rows: any[], randoms: any[]) => {
  if (data.every((el: any) => randoms.includes(el))) {
    return (
      rows
        .flat()
        .filter((el: any) => !randoms.includes(el))
        .reduce((a: any, b: any) => (a += b), 0) * randoms.at(-1)
    );
  }
};

// PART1
const part1 = ({ bingoSets, randomNumbers }) => {
  const randomQueue = [];
  for (const randomNumber of randomNumbers) {
    randomQueue.push(randomNumber);
    for (const { rows } of bingoSets) {
      for (const [index, row] of Object.entries(rows)) {
        const col = getCol(rows, index);
        const rowIsWinner = checkRandomsWithArray(row, rows, randomQueue);
        const colIsWinner = checkRandomsWithArray(col, rows, randomQueue);
        if (rowIsWinner) return rowIsWinner;
        if (colIsWinner) return colIsWinner;
      }
    }
  }
};

runner((input) => {
  const { randomNumbers, bingoSets } = createBingoSets(input);
  return part1({ bingoSets, randomNumbers });
}, './2021/day4/input.txt');

// PART2
const part2 = ({ bingoSets, randomNumbers }) => {
  const winnerTable = new Set();
  const randomQueue: number[] = [];
  for (const randomNumber of randomNumbers) {
    randomQueue.push(randomNumber);
    for (const { rows } of bingoSets) {
      for (const [index, row] of Object.entries(rows)) {
        const col = getCol(rows, index);
        const rowIsWinner = checkRandomsWithArray(row, rows, randomQueue);
        const colIsWinner = checkRandomsWithArray(col, rows, randomQueue);
        if (rowIsWinner || colIsWinner) {
          winnerTable.add(rows);
          if (winnerTable.size === bingoSets.length) {
            const lastBoard = [...winnerTable].at(-1) as [];
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

runner((input) => {
  const { randomNumbers, bingoSets } = createBingoSets(input);
  return part2({ bingoSets, randomNumbers });
}, './2021/day4/input.txt');
