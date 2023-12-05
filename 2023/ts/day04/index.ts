import { INPUT_PATH, runner, splitToFlatArray, sum } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

// Part 1
runner({
  path,
  solution: (input) => {
    let result = 0;

    splitToFlatArray({ input }).map((line) => {
      const [, scores] = line.split(':');
      const [winner, score] = scores.split('|');
      const winnerNumbers = winner.split(' ').filter((c) => c !== '');
      let gameScore = 0;

      score
        .split(' ')
        .filter((c) => c !== '')
        .forEach((el) => {
          if (winnerNumbers.includes(el)) {
            gameScore = gameScore === 0 ? 1 : gameScore * 2;
          }
        });
      result += gameScore;
    });

    return `1: ${result}`;
  },
});

// Part 2
runner({
  path,
  solution: (input) => {
    const data = splitToFlatArray({ input });

    type Game = { winners: number[]; scores: number[] };
    let result = 0;
    const games: Game[] = [];

    data.forEach((line) => {
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

    while (queue.length) {
      const curr = queue.shift() as Game;
      const idx = games.indexOf(curr);
      let matchCount = 0;

      result += 1;

      curr?.scores.forEach((el) => {
        if (curr.winners.includes(el)) {
          matchCount += 1;
        }
      });

      for (let i = 0; i < matchCount; i++) {
        queue.push(games[idx + i + 1]);
      }
    }

    return `2: ${result}`;
  },
});
