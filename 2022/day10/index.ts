import { INPUT_PATH, runner, splitToFlatArray } from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type REGISTER = 'noop' | 'addx';

// Part 1
runner({
  path,
  solution: (input) => {
    const result: number[] = [];
    let cyclesTotal = 0;
    let sum = 1;

    const setSignal = (cyclesTotal: number, sum: number, result: number[]) => {
      if ((cyclesTotal - 20) % 40 === 0) {
        result.push(sum * (20 + result.length * 40));
      }
    };

    splitToFlatArray({ input })
      .map((el) => {
        const [register, value] = el.split(' ');
        return {
          register: register as REGISTER,
          value: parseInt(value),
        };
      })
      .forEach(({ register, value }) => {
        setSignal(cyclesTotal, sum, result);

        switch (register) {
          case 'noop': {
            cyclesTotal += 1;
            break;
          }

          case 'addx': {
            for (let j = 0; j < 2; j++) {
              cyclesTotal += 1;
              setSignal(cyclesTotal, sum, result);
              if (j === 1) sum += value;
            }
            break;
          }
        }
      });

    return result.slice(0, 6).reduce((prev, curr) => prev + curr, 0);
  },
});

// Part 2
runner({
  path,
  solution: (input) => {
    const screen: string[][] = [];
    let line: string[] = [];
    let currPos = 1;

    const setSignal = () => {
      const diff = line.length - currPos;
      line.push(diff < 2 && diff >= -1 ? '#' : ' ');

      if (line.length % 40 === 0) {
        screen.push(line);
        line = [];
      }
    };

    splitToFlatArray({ input })
      .map((el) => {
        const [register, value] = el.split(' ');
        return {
          register: register as REGISTER,
          value: parseInt(value),
        };
      })
      .forEach(({ register, value }) => {
        setSignal();
        if (register === 'addx') {
          setSignal();
          for (let j = 0; j < 2; j++) {
            if (j === 1) currPos += value;
          }
        }
      });

    return screen.map((el) => el.join(''));
  },
});
