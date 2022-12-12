import {
  INPUT_PATH,
  runner,
  splitIntoGroups,
  splitToFlatArray,
} from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type REGISTER = 'noop' | 'addx';

// Part 1
runner({
  path,
  solution: (input) => {
    const result: number[] = [];
    let cyclesTotal = 0;
    let sum = 1;
    const data = splitToFlatArray({ input }).map((el) => {
      const [register, value] = el.split(' ');
      return {
        register: register as REGISTER,
        value: parseInt(value),
      };
    });

    const setSignal = (cyclesTotal: number, sum: number, result: number[]) => {
      if ((cyclesTotal - 20) % 40 === 0) {
        result.push(sum);
      }
    };

    for (let index = 0; index < data.length; index++) {
      const el = data[index];
      setSignal(cyclesTotal, sum, result);

      if (el.register === 'noop') cyclesTotal += 1;

      if (el.register === 'addx') {
        for (let j = 0; j < 2; j++) {
          cyclesTotal += 1;
          setSignal(cyclesTotal, sum, result);
          if (j === 1) sum += el.value;
        }
      }
    }

    console.log('expected', result.slice(0, 6));

    return result
      .slice(0, 6)
      .map((el, index) => el * (20 + index * 40))
      .reduce((prev, curr) => prev + curr, 0);
  },
});

// Part 2
runner({
  path,
  solution: (input) => {
    const data = splitIntoGroups({
      input,
    });

    return 0;
  },
});
