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

runner({
  path,
  solution: (input) => solution(input),
});

function extendedGcd(a, b) {
  if (b === 0) return { gcd: a, x: 1, y: 0 };
  const { gcd, x, y } = extendedGcd(b, a % b);
  return {
    gcd: gcd,
    x: y,
    y: x - Math.floor(a / b) * y,
  };
}

function findMinTokens(prizeX, prizeY, ax, ay, bx, by) {
  // We need to solve:
  // i*ax + j*bx = prizeX
  // i*ay + j*by = prizeY

  const { gcd } = extendedGcd(ax, bx);
  if (prizeX % gcd !== 0) return null;

  const { gcd: gcd2 } = extendedGcd(ay, by);
  if (prizeY % gcd2 !== 0) return null;

  // Find a particular solution for the first equation
  const g1 = extendedGcd(ax, bx);
  const x0 = (g1.x * (prizeX / g1.gcd)) % g1.gcd;
  const y0 = (prizeX - ax * x0) / bx;

  // Find a particular solution for the second equation
  const g2 = extendedGcd(ay, by);
  const x1 = (g2.x * (prizeY / g2.gcd)) % g2.gcd;
  const y1 = (prizeY - ay * x1) / by;

  // Find a common solution
  let i = 0;
  while (i < 1000000) {
    if (i === x0 && i === x1) {
      const j = y0 - (ax / g1.gcd) * i;
      return { i, j };
    }
    i++;
  }

  return null;
}

function solution2(input) {
  const lines = input.split('\n');
  const data = [];
  let part = [];

  lines.forEach((row, idx) => {
    const [x, y] = row.match(/\d+/g)?.map(Number) || [];
    part.push(x, y);

    if ((idx + 1) % 3 === 0) {
      // Assuming each machine has ax, ay, bx, by, prizeX, prizeY
      data.push({
        ax: part[0],
        ay: part[1],
        bx: part[2],
        by: part[3],
        prizeX: part[4],
        prizeY: part[5],
      });
      part = [];
    }
  });

  let totalScore = 0;

  for (const machine of data) {
    const result = findMinTokens(
      machine.prizeX,
      machine.prizeY,
      machine.ax,
      machine.ay,
      machine.bx,
      machine.by,
    );

    if (result !== null) {
      totalScore += 3 * result.i + result.j;
    }
  }

  return totalScore;
}

runner({
  path,
  solution: (input) => solution2(input),
});
