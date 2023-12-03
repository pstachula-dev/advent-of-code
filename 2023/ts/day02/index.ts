import { INPUT_PATH, runner, splitToFlatArray, sum } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type GameRecord = Record<string, number>;

// Part 1
runner({
  path,
  solution: (input: string): number => {
    let idsSum = 0;
    const gameMax: GameRecord = {
      green: 13,
      red: 12,
      blue: 14,
    };

    splitToFlatArray({ input, splitChar: '\n' }).map((group) => {
      const [id, ...games] = group.split(': ');

      games.map((groupGames) => {
        let isPossible = true;
        groupGames.split('; ').map((game) => {
          game.split(/,\s/).map((row) => {
            const [val, type] = row.split(' ');

            if (Number(val) > gameMax[type]) {
              isPossible = false;
              return;
            }
          });
        });

        if (isPossible) {
          idsSum += Number(id.split(' ')[1]);
        }
      });
    });
    return idsSum;
  },
});

// Part 2
runner({
  path,
  solution: (input) => {
    let idsSum = 0;

    splitToFlatArray({ input, splitChar: '\n' }).map((group) => {
      const [_id, ...games] = group.split(': ');

      games.map((groupGames) => {
        const game: GameRecord = { red: 0, green: 0, blue: 0 };
        groupGames.split(/,\s|; /).map((row) => {
          const [val, type] = row.split(' ');

          if (Number(val) > game[type]) {
            game[type] = Number(val);
          }
        });

        idsSum += Object.values(game).reduce((acc, curr) => acc * curr, 1);
      });
    });
    return idsSum;
  },
});
