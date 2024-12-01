import { INPUT_PATH, runner, splitToFlatArray, sum } from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

enum STATE {
  second = 2,
  first = 1,
  empty = 0,
}

// Part 1
runner({
  path,
  solution: (input) => {
    return splitToFlatArray({ input })
      .map((row) => row.split(''))
      .map((chars) => {
        const hash: Record<string, STATE> = {};
        const signal: string[] = [];

        chars.find((char, index) => {
          signal.push(char);
          hash[char] = hash[char] ? STATE.second : STATE.first;

          if (hash[char] === STATE.second) {
            signal
              .splice(0, signal.indexOf(char) + STATE.first)
              .forEach((signalChar) => {
                hash[signalChar] =
                  signalChar !== char ? STATE.empty : STATE.first;
              });
          }

          // p1
          // if (signal.length === 4) {
          if (signal.length === 14) {
            console.log('Result', index + 1);
            return 1;
          }
        });
      });
  },
});
