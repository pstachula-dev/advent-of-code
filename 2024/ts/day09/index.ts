import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${SAMPLE_PATH}`;

const p1 = (lines: number[]) => {
  const disk: string[] = [];

  lines.forEach((length, idx) => {
    const char = idx % 2 === 0 ? String(idx / 2) : '.';
    disk.push(...Array.from<string>({ length }).fill(char));
  });

  const dotPositions = disk
    .map((dot, idx) => (dot === '.' ? idx : null))
    .filter((dot) => dot !== null);

  // console.log(disk.join(''));

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

  lines.forEach((length, idx) => {
    const char = idx % 2 === 0 ? String(idx / 2) : '.';
    disk.push(...Array.from<string>({ length }).fill(char));
  });

  const dotPositions = disk
    .map((dot, idx) => (dot === '.' ? idx : null))
    .filter((dot) => dot !== null);

  const checkDotsLen = (idx: number) => {
    let len = 0;
    let char = disk[idx];
    while (char === '.') {
      len++;
      char = disk[++idx];
    }
    return len;
  };

  console.log(dotPositions);
  console.log(disk.join(''));

  for (let i = disk.length - 1; i >= 0; i--) {
    const len = lines.pop();

    const char = disk[i];

    if (char !== '.') {
      const dotIdx = dotPositions.shift() || -1;

      const x = checkDotsLen(dotIdx);
      console.log(x, dotIdx);

      if (dotIdx > i) break;
    }
  }

  return disk
    .filter((e) => e !== '.')
    .reduce((acc, curr, idx) => (acc += +curr * idx), 0);
};
runner({
  path,
  solution: (input) => {
    const lines = input.split('').map(Number);

    return { p2: p2(lines) };
  },
});
