import { INPUT_PATH, runner, SAMPLE_PATH } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const solution = (input: string) => {
  const [patternsRaw, designsRaw] = input.trim().split('\n\n');
  const designs = designsRaw.split('\n');
  const patterns = patternsRaw.split(', ');
  let count = 0;

  const hasDesign = (str: string, memo: Map<string, boolean>) => {
    if (str === '') return true;
    if (memo.has(str)) return memo.get(str);

    for (const p of patterns) {
      if (str.startsWith(p)) {
        const part = str.substring(p.length);

        if (hasDesign(part, memo)) {
          return memo.set(part, true);
        }
      }
    }

    return false;
  };

  for (const design of designs) {
    const designMap = new Map<string, boolean>();
    if (hasDesign(design, designMap)) count++;
  }

  return count;
};

const solution2 = (input: string) => {
  const [patternsRaw, designsRaw] = input.trim().split('\n\n');
  const designs = designsRaw.split('\n');
  const patterns = patternsRaw.split(', ');

  const hasDesign = (str: string, memo: Map<string, number>): number => {
    let localCount = 0;

    if (memo.has(str)) return memo.get(str) || localCount;
    if (str === '') return 1;

    for (const p of patterns) {
      if (str.startsWith(p)) {
        const part = str.substring(p.length);
        localCount += hasDesign(part, memo);
        memo.set(str, localCount);
      }
    }

    return localCount;
  };

  let count = 0;
  for (const design of designs) {
    const designMap = new Map<string, number>();
    count += hasDesign(design, designMap);
  }

  return count;
};

runner({
  path,
  solution: (input) => solution(input),
});

runner({
  path,
  solution: (input) => solution2(input),
});
