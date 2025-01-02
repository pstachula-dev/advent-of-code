import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const parseData = (input: string) => {
  const [registerRaw, operationsRaw] = input.split('\n\n');
  const registerMap: Record<string, number | undefined> = {};

  const operations = operationsRaw
    .replaceAll('-> ', '')
    .split('\n')
    .map((row) => row.split(' '))
    .slice(0, -1);

  operations.forEach((data) => {
    if (data[3].startsWith('z')) registerMap[data[3]] = undefined;
  });

  registerRaw.split('\n').map((row) => {
    const [reg, val] = row.split(': ');
    registerMap[reg] = Number(val);
  });

  return { operations, registerMap };
};

const solution = (input: string) => {
  const { operations, registerMap } = parseData(input);

  while (Object.values(registerMap).some((el) => el === undefined)) {
    operations.forEach(([v1reg, op, v2reg, reg]) => {
      const v1 = registerMap[v1reg];
      const v2 = registerMap[v2reg];

      if (v1 !== undefined && v2 !== undefined) {
        if (op === 'AND') registerMap[reg] = v1 & v2;
        if (op === 'OR') registerMap[reg] = v1 | v2;
        if (op === 'XOR') registerMap[reg] = v1 ^ v2;
      }
    });
  }

  const result = Object.keys(registerMap)
    .filter((e) => e.startsWith('z'))
    .sort((a, b) => b.localeCompare(a))
    .map((reg) => registerMap[reg])
    .join('');

  return parseInt(result, 2);
};

runner({
  path,
  name: 'Part1',
  solution: (input) => solution(input),
});
