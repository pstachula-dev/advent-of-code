import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const solution = (input: string) => {
  const data: number[][][] = [];
  let part: number[][] = [];

  splitLines(input)
    .filter((e) => e.length > 1)
    .forEach((row, idx) => {
      const [x, y] = row.match(/\d+/g)?.map(Number) || [];
      part.push([x, y]);

      if ((idx + 1) % 3 === 0) {
        data.push(part);
        part = [];
      }
    });

  let score = 0;

  data.filter(([a, b, prize]) => {
    const [ax, ay] = a;
    const [bx, by] = b;
    const [prizeX, prizeY] = prize;

    let result = 0;

    for (let i = 0; i <= 100; i++) {
      for (let j = 0; j <= 100; j++) {
        if (ax * i + bx * j === prizeX && ay * i + by * j === prizeY) {
          result = i * 3 + j;
          break;
        }
      }

      if (result) {
        score += result;
        break;
      }
    }
  });

  return score;
};

// PART2  TODO: fix
const calcScore = (prize: number, cords: number[], reverse: boolean) => {
  const [a, b] = reverse ? cords.toReversed() : cords;
  const count = Math.floor(prize / a);

  let result: number[] | null = null;

  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100; j++) {
      if (b * j + a * (count - i) === prize) {
        result = [count - i, j];
        break;
      }
    }
    if (result) break;
  }

  return reverse ? result?.toReversed() : result;
};

runner({
  path,
  solution: (input) => solution(input),
});
//
// Button A: X+26, Y+66
// Button B: X+67, Y+21
// Prize: X=10000000012748, Y=10000000012176

const scoreY = 10000000012176;
const scoreX = 10000000012748;
const xa = 26;
const xb = 67;
const ya = 66;
const yb = 11;

function extendedEuclidean(
  a: number,
  b: number,
): { gcd: number; x: number; y: number } {
  if (b === 0) {
    return { gcd: a, x: 1, y: 0 };
  }

  const { gcd, x: x1, y: y1 } = extendedEuclidean(b, a % b);

  const x = y1;
  const y = x1 - Math.floor(a / b) * y1;

  return { gcd, x, y };
}
