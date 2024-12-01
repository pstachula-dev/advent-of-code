import {
  INPUT_PATH,
  runner,
  splitToFlatArray,
  isNumber,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const GEAR = '*';
const DOT = '.';
const hasSymbol = (chars: string[]) =>
  chars.some(char => char && char !== DOT && !isNumber(char));

// Part 1
runner({
  path,
  solution: input => {
    const data = splitToFlatArray({ input });
    let result = 0;

    data.forEach((row, rowIdx) => {
      let numberPart = '';
      let hasEngineSymbol = false;

      [...row].forEach((char, colIdx) => {
        if (isNumber(char)) {
          numberPart += char;

          if (!hasEngineSymbol) {
            hasEngineSymbol = hasSymbol([
              data[rowIdx][colIdx - 1],
              data[rowIdx][colIdx + 1],
              data[rowIdx - 1]?.[colIdx - 1],
              data[rowIdx - 1]?.[colIdx],
              data[rowIdx - 1]?.[colIdx + 1],
              data[rowIdx + 1]?.[colIdx - 1],
              data[rowIdx + 1]?.[colIdx],
              data[rowIdx + 1]?.[colIdx + 1],
            ]);
          }
        }

        const nextChar = row[colIdx + 1];
        const isNextWord =
          ([DOT, undefined].includes(nextChar) || !isNumber(nextChar)) &&
          numberPart.length;

        if (isNextWord) {
          if (hasEngineSymbol) result += Number(numberPart);
          numberPart = '';
          hasEngineSymbol = false;
        }
      });
    });

    return result;
  },
});

const hasGear = (chars: string[]) => chars.some(char => char === GEAR);

// Part 2
runner({
  path,
  solution: input => {
    const data = splitToFlatArray({ input });
    let result = 0;
    const gears: number[][] = [];
    const valuesPos: { pos: number[]; val: number }[] = [];

    data.forEach((row, rowIdx) => {
      let numberPart = '';
      let hasEngineSymbol = false;

      [...row].forEach((char, colIdx) => {
        if (char === GEAR) {
          gears.push([rowIdx, colIdx]);
        }

        if (isNumber(char)) {
          numberPart += char;
          if (!hasEngineSymbol) {
            hasEngineSymbol = hasGear([
              data[rowIdx][colIdx - 1],
              data[rowIdx][colIdx + 1],
              data[rowIdx - 1]?.[colIdx - 1],
              data[rowIdx - 1]?.[colIdx],
              data[rowIdx - 1]?.[colIdx + 1],
              data[rowIdx + 1]?.[colIdx - 1],
              data[rowIdx + 1]?.[colIdx],
              data[rowIdx + 1]?.[colIdx + 1],
            ]);

            if (hasEngineSymbol) {
              valuesPos.push({
                pos: [rowIdx, colIdx],
                val: 0,
              });
            }
          }
        }

        const nextChar = row[colIdx + 1];
        const isNextWord =
          ([DOT, undefined].includes(nextChar) || !isNumber(nextChar)) &&
          numberPart.length;

        if (isNextWord) {
          if (hasEngineSymbol) {
            valuesPos[valuesPos.length - 1].val = Number(numberPart);
          }

          numberPart = '';
          hasEngineSymbol = false;
        }
      });
    });

    for (const [x, y] of gears) {
      const values = valuesPos.filter(
        ({ pos }) => Math.abs(pos[0] - x) <= 1 && Math.abs(pos[1] - y) <= 1,
      );

      if (values.length > 1) {
        result += values[0].val * values[1].val;
      }
    }

    return result;
  },
});
