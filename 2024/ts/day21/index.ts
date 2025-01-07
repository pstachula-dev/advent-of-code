import {
  getGrid,
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
  findGridPos,
} from '../../../lib/utils';

const path = `${__dirname}/${SAMPLE_PATH}`;

const directions: [number, number][] = [
  [1, 0], // right
  [0, -1], // top
  [-1, 0], // left
  [0, 1], // bottom
];

// <vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
// v<<A>>^A<A>AvA<^AA>A<vAAA>^A
// <A^A>^^AvvvA
// 029A

const keyGrid = [
  ['', '^', 'A'],
  ['<', 'v', '>'],
];

// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
//     | 0 | A |
//     +---+---+

type Point = {
  x: number;
  y: number;
};

const paths = ['029A'];
// const paths = ['029A', '980A', '179A', '456A', '379A'];

const getDirection = (dx: number, dy: number) => {
  if (dx === 0 && dy === -1) {
    return '^';
  } else if (dx === 0 && dy === 1) {
    return 'v';
  } else if (dx === -1 && dy === 0) {
    return '<';
  } else if (dx === 1 && dy === 0) {
    return '>';
  } else {
    throw new Error('Wrong direction');
  }
};

const bfs = (
  grid: string[][],
  start: Point,
  end: Point,
  isKeypad?: boolean,
) => {
  const maxy = grid.length;
  const maxx = grid[0].length;
  const visited = getGrid(maxy, maxx, false);
  const queue: [Point, string[]][] = [[start, []]];

  while (queue.length) {
    const [curr, path] = queue.pop()!;

    if (curr.x === end.x && curr.y === end.y) {
      return path;
    }

    for (const [dx, dy] of directions) {
      const x = dx + curr.x;
      const y = dy + curr.y;

      if (x >= maxx || x < 0 || y < 0 || y >= maxy) continue;
      if (visited[y][x]) continue;
      if (grid[y][x] === ' ') continue;

      const dir = getDirection(dx, dy);

      visited[y][x] = true;
      queue.push([{ y, x }, [...path, dir]]);
    }
  }

  return [];
};

const solution = (input: string) => {
  const grid = splitLines(input).map((row) => row.split(''));
  const results: string[] = [];

  paths.forEach((item) => {
    const numPath = item.split('');
    const pathFirst: string[] = [];
    const pathSecond: string[] = [];
    const pathThird: string[] = [];

    ['A', ...numPath].forEach((char, i) => {
      if (i < numPath.length) {
        const start = findGridPos(grid, char);
        const end = findGridPos(grid, numPath[i]);
        const path = bfs(grid, start, end);
        pathFirst.push(...path, 'A');

        console.log(`${char} => ${numPath[i]}`, pathFirst);
      }
    });

    ['A', ...pathFirst].forEach((char, i) => {
      if (i < pathFirst.length) {
        const start = findGridPos(keyGrid, char);
        const end = findGridPos(keyGrid, pathFirst[i]);
        const path = bfs(keyGrid, start, end, true);
        pathSecond.push(...path, 'A');
      }
    });

    ['A', ...pathSecond].forEach((char, i) => {
      if (i < pathSecond.length) {
        const start = findGridPos(keyGrid, char);
        const end = findGridPos(keyGrid, pathSecond[i]);
        const path = bfs(keyGrid, start, end, true);
        pathThird.push(...path, 'A');
      }
    });

    console.log(pathThird.join(''));
    console.log(pathSecond.join(''));
    console.log(pathFirst.join(''));

    results.push(pathThird.join(''));
  });

  // console.log(results);

  const res = [
    '<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A',
    '<v<A>>^AAAvA^A<vA<AA>>^AvAA<^A>A<v<A>A>^AAAvA<^A>A<vA>^A<A>A',
    '<v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A',
    '<v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAvA<^A>A',
    '<v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A',
  ];

  // console.log(pathThird.join(''));
  // console.log(pathSecond.join(''));
  // console.log(pathFirst.join(''));

  return 1;
};

runner({
  path,
  solution: (input) => solution(input),
});
