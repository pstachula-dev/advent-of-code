const file = require('fs');

// import { INPUT_PATH, runner, splitToFlatArray } from '../../../lib/utils';

// const path = `${__dirname}/${INPUT_PATH}`;

// Part 1
// runner({
//   path,
//   solution: (input) => {
//     let result = 0;

//     splitToFlatArray({ input }).map((line) => {
//       const [, scores] = line.split(':');
//       const [winner, score] = scores.split('|');
//       const winnerNumbers = winner.split(' ').filter((c) => c !== '');
//       let gameScore = 0;

//       score
//         .split(' ')
//         .filter((c) => c !== '')
//         .forEach((el) => {
//           if (winnerNumbers.includes(el)) {
//             gameScore = gameScore === 0 ? 1 : gameScore * 2;
//           }
//         });
//       result += gameScore;
//     });

//     return `1: ${result}`;
//   },
// });

// Part 2
// const data = splitToFlatArray({ input });

const data = file.readFileSync(`${__dirname}/input.txt`, 'utf8');

let result = 0;
const games = [];

data
  .split('\n')
  .filter(Boolean)
  .forEach((line) => {
    const [, scores] = line.split(':');
    const [winner, score] = scores.split('|');
    games.push({
      winners: winner
        .split(' ')
        .filter((c) => c !== '')
        .map(Number),
      scores: score
        .split(' ')
        .filter((c) => c !== '')
        .map(Number),
    });
  });

const queue = [...games];

const doChunk = async (curr) => {
  let matchCount = 0;
  curr?.scores.forEach((el) => {
    if (curr.winners.includes(el)) {
      matchCount += 1;
    }
  });
  return matchCount;
};

const main = async () => {
  while (queue.length) {
    const curr = queue.shift();
    const idx = games.indexOf(curr);

    result += 1;
    const matchCount = await doChunk(curr);

    for (let i = 0; i < matchCount; i++) {
      queue.push(games[idx + i + 1]);
    }
  }
};

main();

console.log(result);
