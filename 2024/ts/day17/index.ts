import { chunk } from 'lodash';
import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type Register = Record<string, number>;

const getCombo = (op: number, registers: Register) => {
  if (op <= 3) return op;

  switch (op) {
    case 4:
      return registers.A;
    case 5:
      return registers.B;
    case 6:
      return registers.C;
    case 7:
      throw new Error('Invalid code');
    default:
      throw new Error('Unexpected op');
  }
};

const getOut = (
  opcode: number,
  operand: number,
  registers: Register,
  pointer: { idx: number },
) => {
  switch (opcode) {
    case 0:
      registers.A = registers.A >> getCombo(operand, registers);
      break;
    case 1:
      registers.B = registers.B ^ operand;
      break;
    case 2:
      registers.B = getCombo(operand, registers) % 8;
      break;
    case 3:
      if (registers.A !== 0) pointer.idx = operand - 1;
      break;
    case 4:
      registers.B = registers.B ^ registers.C;
      break;
    case 5:
      return getCombo(operand, registers) % 8;
    case 6:
      registers.B = registers.A >> getCombo(operand, registers);
      break;
    case 7:
      registers.C = registers.A >> getCombo(operand, registers);
      break;
  }
};

const solution = (input: string) => {
  const [registersRaw, programRaw] = input.split('\n\n');
  const program = chunk(programRaw.match(/\d/g)?.map(Number), 2);
  const registers: Register = {};

  registersRaw.split('\n').forEach((row) => {
    const [, reg, val] = row.replace(':', '').split(' ');
    registers[reg] = +val;
  });

  const result: number[] = [];
  const pointer = { idx: 0 };

  while (pointer.idx < program.length) {
    const [opcode, operand] = program[pointer.idx];
    const out = getOut(opcode, operand, registers, pointer);

    if (out !== undefined) result.push(out);

    pointer.idx++;
  }

  return result.join(',');
};

runner({
  path,
  solution: (input) => solution(input),
});

// 117440
