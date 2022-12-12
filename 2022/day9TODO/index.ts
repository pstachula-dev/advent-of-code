import {
  INPUT_PATH,
  runner,
  splitIntoGroups,
  splitToFlatArray,
} from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type MOVE = 'R' | 'L' | 'U' | 'D' | '';
type RopeElement = 'H' | 'T' | '.' | 's' | '#';
type RopeState = RopeElement[][];

type Rope = {
  char: RopeElement;
  x: number;
  y: number;
};

type RopeMoveProps = {
  head: Rope;
  tail: Rope;
  prevMove: MOVE;
  x?: number;
  y?: number;
};

const moveState: RopeState = [
  ['.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.'],
];

const state: RopeState = [
  ['.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.'],
  ['H', '.', '.', '.', '.', '.'],
];

const printState = (
  stateProp: RopeState,
  tail: Rope,
  head: Rope,
  clear = true,
) => {
  stateProp = stateProp.map((row) => row.map((el) => (el = '.')));
  stateProp[tail.y][tail.x] = 'T';
  stateProp[head.y][head.x] = 'H';
  console.log(stateProp.flat());
};

// ..##..
// ...##.
// .####.
// ....#.
// s###..

// Part 1
runner({
  path,
  solution: (input) => {
    const moves = splitToFlatArray({ input }).map((e) => {
      const [move, value] = e.split(' ');
      return { move: move as MOVE, value: parseInt(value) };
    });
    const tail: Rope = {
      char: 'T',
      x: 0,
      y: 4,
    };

    const head: Rope = {
      char: 'H',
      x: 0,
      y: 4,
    };

    const horizontalMark = ({
      moveState,
      tail,
      head,
      nextX,
    }: {
      moveState: RopeState;
      tail: Rope;
      head: Rope;
      nextX: number;
    }) => {
      const index = tail.x <= nextX ? tail.x : nextX;
      const indexEnd = tail.x <= nextX ? nextX : tail.x;

      for (let i = index; i < indexEnd; i++) {
        moveState[tail.y][i] = '#';
      }
    };

    // const verticalMark = () => {};

    const calibrateHorizontal = (tail: Rope, prevMove: MOVE) => {
      if (['D', 'U'].includes(prevMove)) {
        tail.y += 'D' === prevMove ? 1 : -1;
      }
    };

    const calibrateVertical = (tail: Rope, prevMove: MOVE) => {
      if (['R', 'L'].includes(prevMove)) {
        tail.x += 'R' === prevMove ? 1 : -1;
      }
    };

    const moveRight = ({
      head,
      tail,
      prevMove,
      x = 0,
      y = 0,
    }: RopeMoveProps) => {
      calibrateHorizontal(tail, prevMove);
      horizontalMark({ moveState, head, tail, nextX: x });
      head.x += x;
      tail.x += x - 1;
    };

    const moveLeft = ({
      head,
      tail,
      prevMove,
      x = 0,
      y = 0,
    }: RopeMoveProps) => {
      calibrateHorizontal(tail, prevMove);
      horizontalMark({ moveState, tail, head, nextX: x });
      head.x -= x;
      tail.x -= x - 1;
    };

    const moveUp = ({ head, tail, prevMove, x = 0, y = 0 }: RopeMoveProps) => {
      console.log(prevMove);
      head.y -= y;
      tail.y -= y - 1;
      calibrateVertical(tail, prevMove);
    };

    const moveDown = ({
      head,
      tail,
      prevMove,
      x = 0,
      y = 0,
    }: RopeMoveProps) => {
      head.y += y;
      tail.y += y - 1;
      calibrateVertical(tail, prevMove);
    };

    let prevMove: MOVE = '';

    moves.forEach(({ move, value }) => {
      switch (move) {
        case 'R': {
          moveRight({ head, tail, prevMove, x: value });
          break;
        }
        case 'L': {
          moveLeft({ head, tail, prevMove, x: value });
          break;
        }
        case 'U': {
          moveUp({ head, tail, prevMove, y: value });
          break;
        }
        case 'D': {
          moveDown({ head, tail, prevMove, y: value });
          break;
        }
        default:
          break;
      }
      prevMove = move;

      console.log('=====+==> Move: ', move, value, ' <=====+==');
      printState(state, tail, head);
      // console.log(moveState);
    });

    console.log('=========> moveState <==========');
    console.log(moveState);

    return moveState.map((row) => row.filter((el) => el === '#')).flat(2)
      .length;
  },
});

// Part 2
runner({
  path,
  solution: (input) => {
    const data = splitIntoGroups({
      input,
      parser: (e) => Number(e),
    });

    return 0;
  },
});
