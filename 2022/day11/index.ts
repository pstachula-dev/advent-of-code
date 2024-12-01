import { INPUT_PATH, runner, splitIntoGroups } from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const parseMonkey = (row: string[]) => {
  const [monkey, items, operation, test, ifTrue, ifFalse] = row;

  return {
    monkey: parseInt(monkey.split(' ')[1].replace(':', ''), 10),
    items: items
      .split(' ')
      .slice(4)
      .map(e => parseInt(e, 10)),
    op: operation.split(' ').slice(5),
    test: parseInt(test.split(' ')[5], 10),
    ifTrue: parseInt(ifTrue.split(' ')[9], 10),
    ifFalse: parseInt(ifFalse.split(' ')[9], 10),
  };
};

const monkeysInspector = (input: string, limit: number, divider?: number) => {
  const monkeysInspected: Record<string, number> = {};
  const data = splitIntoGroups({ input }).map(parseMonkey);
  const totalModulo = data.map(({ test }) => test).reduce((a, b) => a * b, 1);

  for (let i = 0; i < limit; i++) {
    data.map(({ monkey, items, op, test, ifTrue, ifFalse }, index) => {
      const mStr = monkey.toString();
      const operation = op[1];
      const val1 = op[0];
      const val2 = op[2];

      items.map(val => {
        monkeysInspected[mStr]
          ? monkeysInspected[mStr]++
          : (monkeysInspected[mStr] = 1);
        const oldVal1 = val1 === 'old' ? val : parseInt(val1);
        const oldVal2 = val2 === 'old' ? val : parseInt(val2);
        const oldVal =
          operation === '+' ? oldVal1 + oldVal2 : oldVal1 * oldVal2;
        const wLevel = divider
          ? Math.floor(oldVal / divider)
          : (oldVal1 + oldVal2) % totalModulo;

        data[wLevel % test === 0 ? ifTrue : ifFalse].items.push(wLevel);
      });
      data[index].items = [];
    });
  }

  return Object.values(monkeysInspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((prev, curr) => curr * prev, 1);
};

// Part 1
runner({
  path,
  solution: input => monkeysInspector(input, 20, 3),
});

// Part 2
runner({
  path,
  solution: input => monkeysInspector(input, 10_000),
});
