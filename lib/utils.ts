import { promises } from 'fs';

export type SplitChar = '\n' | '\n\n' | ' ' | ',';

export const INPUT_PATH = 'input.txt';
export const SAMPLE_PATH = 'sample.txt';

export const splitLines = (input: string) => input.split('\n').slice(0, -1);

export const debugGrid = <T>(lines: T[][]) => {
  // const range = Array(lines[0].length)
  //   .fill(0)
  //   .map((_, i) => i)
  //   .join('');

  // console.log(' ', range);
  lines.map((e, y) => console.log(y, e.join('')));
  console.log('\n');
};

export const directions: [number, number][] = [
  [-1, 0], // left
  [1, 0], // right
  [0, 1], // bottom
  [0, -1], // top
];

export const runner = async ({
  solution,
  path,
}: {
  solution: (arg: string) => void;
  path: string;
  label?: string;
  limit?: number;
  splitChar?: SplitChar;
}) => {
  const data = await promises.readFile(path, 'utf8');
  const t0 = performance.now();
  console.log('Result:', solution(data));
  const t1 = performance.now();
  console.log('Bench:', `Time ${t1 - t0}`, 'ms');
};

export const splitToFlatArray = <T extends string | number = string>({
  input,
  splitChar = '\n',
  limit = Infinity,
  parser = (e) => e as T,
}: {
  input: string;
  splitChar?: SplitChar;
  limit?: number;
  parser?: (data: string) => T;
}) => {
  return input.split(splitChar).map(parser).slice(0, limit).filter(Boolean);
};

export const splitIntoGroups = <T extends string | number = string>({
  input,
  splitGroupChar = '\n\n',
  splitChar = '\n',
  limit = Infinity,
  parser = (e) => e as T,
}: {
  input: string;
  splitGroupChar?: SplitChar;
  splitChar?: SplitChar;
  limit?: number;
  parser?: (data: string) => T;
}) => {
  return input
    .split(splitGroupChar)
    .splice(0, limit)
    .map((el) => splitToFlatArray({ input: el, parser, splitChar }));
};

export const isNumber = (arg: string): boolean => Number.isInteger(Number(arg));

export const sum = (curr: number, prev: number, currIndex: number): number =>
  curr + prev;

export const permutate = (n: number, operators: string[]): string[] => {
  const results: string[] = [];

  const generatePermutations = (current: string[], length: number) => {
    if (length === 0) {
      results.push(current.join(''));
      return;
    }

    for (const op of operators) {
      generatePermutations([...current, op], length - 1);
    }
  };

  generatePermutations([], n);

  return results;
};

// eslint-disable-next-line prettier/prettier
export const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
