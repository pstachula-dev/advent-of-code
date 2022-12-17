import { INPUT_PATH, runner, splitIntoGroups } from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const parseMonkey = (row: string[]) => {
  const [monkey, items, operation, test, ifTrue, ifFalse] = row;

  return {
    monkey: parseInt(monkey.split(' ')[1].replace(':', ''), 10),
    items: items
      .split(' ')
      .slice(4)
      .map((e) => parseInt(e, 10)),
    op: operation.split(' ').slice(5),
    test: parseInt(test.split(' ')[5], 10),
    ifTrue: parseInt(ifTrue.split(' ')[9], 10),
    ifFalse: parseInt(ifFalse.split(' ')[9], 10),
  };
};

const monkeysInspector = (input: string, limit: number, divider?: number) => {
  const monkeysInspected: Record<string, number> = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
  };
  const data = splitIntoGroups({ input }).map(parseMonkey);
  const totalModulo = data.map(({ test }) => test).reduce((a, b) => a * b, 1);

  for (let i = 0; i < limit; i++) {
    data.map(({ monkey, items, op, test, ifTrue, ifFalse }, index) => {
      items.map((val) => {
        monkeysInspected[monkey.toString()]++;
        const oldVal2 = op[2] === 'old' ? val : parseInt(op[2], 10);
        const oldVal1 = op[0] === 'old' ? val : parseInt(op[0], 10);
        let monkeyIndex = 0;
        let wLevel = 0;

        if (op[1] === '+') {
          wLevel = divider
            ? Math.floor((oldVal1 + oldVal2) / divider)
            : (oldVal1 + oldVal2) % totalModulo;
        }

        if (op[1] === '*') {
          wLevel = divider
            ? Math.floor((oldVal1 * oldVal2) / divider)
            : (oldVal1 * oldVal2) % totalModulo;
        }

        monkeyIndex = wLevel % test === 0 ? ifTrue : ifFalse;
        data[monkeyIndex].items.push(wLevel);
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
  solution: (input) => {
    return monkeysInspector(input, 20, 3);
  },
});

// Part 2
runner({
  path,
  solution: (input) => {
    return monkeysInspector(input, 10_000);
  },
});
