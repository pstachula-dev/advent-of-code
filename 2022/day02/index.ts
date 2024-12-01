import { runner, splitIntoGroups } from '../../lib/utils';

enum ELF {
  A = 'A', // rock
  B = 'B', // paper
  C = 'C', // scissors
}

enum USER {
  X = 'X', // rock
  Y = 'Y', // paper
  Z = 'Z', // scissors
}

enum SCORE {
  rock = 1,
  paper = 2,
  scissors = 3,
}

const WIN_SCORE = 6;
const DRAW_SCORE = 3;

const elfStrategy = (left: string, right: string) => {
  switch (left) {
    case ELF.A: {
      if (right === USER.X) return SCORE.rock + DRAW_SCORE;
      if (right === USER.Y) return SCORE.paper + WIN_SCORE;
      if (right === USER.Z) return SCORE.scissors;
      return 0;
    }
    case ELF.B: {
      if (right === USER.X) return SCORE.rock;
      if (right === USER.Y) return SCORE.paper + DRAW_SCORE;
      if (right === USER.Z) return SCORE.scissors + WIN_SCORE;
      return 0;
    }
    case ELF.C: {
      if (right === USER.X) return SCORE.rock + WIN_SCORE;
      if (right === USER.Y) return SCORE.paper;
      if (right === USER.Z) return SCORE.scissors + DRAW_SCORE;
      return 0;
    }
    default:
      return 0;
  }
};

const elfSecondStrategy = (left: string, right: string) => {
  switch (left) {
    case ELF.A: {
      if (right === USER.X) return SCORE.scissors;
      if (right === USER.Y) return SCORE.rock + DRAW_SCORE;
      if (right === USER.Z) return SCORE.paper + WIN_SCORE;
      return 0;
    }
    case ELF.B: {
      if (right === USER.X) return SCORE.rock;
      if (right === USER.Y) return SCORE.paper + DRAW_SCORE;
      if (right === USER.Z) return SCORE.scissors + WIN_SCORE;
      return 0;
    }
    case ELF.C: {
      if (right === USER.X) return SCORE.paper;
      if (right === USER.Y) return SCORE.scissors + DRAW_SCORE;
      if (right === USER.Z) return SCORE.rock + WIN_SCORE;
      return 0;
    }
    default:
      return 0;
  }
};

// Part 1
runner({
  path: `${__dirname}/input.txt`,
  solution: input => {
    return splitIntoGroups({
      input,
      splitGroupChar: '\n',
      splitChar: ' ',
    })
      .map(([left, right]) => elfStrategy(left, right))
      .reduce((curr, prev) => curr + prev, 0);
  },
});

// Part 2
runner({
  path: `${__dirname}/input.txt`,
  solution: input => {
    return splitIntoGroups({
      input,
      splitGroupChar: '\n',
      splitChar: ' ',
    })
      .map(([left, right]) => elfSecondStrategy(left, right))
      .reduce((curr, prev) => curr + prev, 0);
  },
});
