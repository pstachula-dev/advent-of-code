import { promises } from 'fs';

export type SplitChar = '\n' | '\n\n' | ' ' | ',';

export const INPUT_PATH = 'input.txt';

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
  performance.mark('time-start');
  console.log('Result:', solution(data));
  performance.mark('time-stop');
  console.log(
    'Bench:',
    performance.measure('Time', 'time-start', 'time-stop').duration,
    'ms',
  );
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
  return input.split(splitChar).map(parser).slice(0, limit);
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

export const sum = (curr: number, prev: number, currIndex: number): number =>
  curr + prev;

// eslint-disable-next-line prettier/prettier
export const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];