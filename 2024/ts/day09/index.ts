import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const p1 = (lines: number[]) => {
  const disk: string[] = [];

  lines.forEach((length, idx) => {
    const char = idx % 2 === 0 ? String(idx / 2) : '.';
    disk.push(...Array.from<string>({ length }).fill(char));
  });

  const dotPositions = disk
    .map((dot, idx) => (dot === '.' ? idx : null))
    .filter((dot) => dot !== null);

  for (let i = disk.length - 1; i >= 0; i--) {
    const char = disk[i];

    if (char !== '.') {
      const dotIdx = dotPositions.shift() || -1;

      if (dotIdx > i) break;

      disk[dotIdx] = char;
      disk[i] = '.';
    }
  }

  return disk
    .filter((e) => e !== '.')
    .reduce((acc, curr, idx) => (acc += +curr * idx), 0);
};

const p2 = (lines: number[]) => {
  const disk: string[] = [];
  const charQueue: string[] = [];

  lines.forEach((length, idx) => {
    const char = idx % 2 === 0 ? String(idx / 2) : '.';
    disk.push(...Array.from<string>({ length }).fill(char));
    if (idx % 2 === 0) charQueue.push(char);
  });

  lines
    .filter((el, idx) => idx % 2 === 0)
    .toReversed()
    .forEach((part) => {
      const char = charQueue.pop() || '';
      const charIdx = disk.indexOf(char);
      let freePart: number[] = [];

      for (let i = 0; i < disk.length; i++) {
        const first = disk[i];

        if (freePart.length && first !== '.') {
          if (part <= freePart.length) break;
          freePart = [];
        }

        if (first === '.' && i < charIdx) {
          freePart.push(i);
        }
      }

      if (part <= freePart.length) {
        let toDelete = part;

        for (let i = 0; i < part; i++) {
          disk[freePart[i]] = char;
        }

        for (let i = disk.length; i >= 0; i--) {
          if (toDelete === 0) break;
          if (disk[i] === char) {
            disk[i] = '.';
            toDelete--;
          }
        }
      }
    });

  return disk.reduce(
    (acc, curr, idx) => (curr !== '.' ? (acc += +curr * idx) : acc),
    0,
  );
};

runner({
  path,
  solution: (input) => {
    const lines = input.split('').slice(0, -1).map(Number);
    return { p2: p2(lines) };
  },
});
