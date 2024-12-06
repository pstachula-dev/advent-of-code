import { INPUT_PATH, runner, SAMPLE_PATH } from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

const p1 = (orders: number[][], updates: number[][]) => {
  return updates
    .filter((row) => {
      return row.every((el, idx) => {
        const rest = row.slice(idx + 1);
        return (
          rest.filter((next) =>
            orders.filter(([x]) => next === x).every(([, y]) => el !== y),
          ).length === rest.length
        );
      });
    })
    .reduce((acc, curr) => acc + curr[Math.floor(curr.length / 2)], 0);
};

// Stupid and slow implementation :(
const p2 = (orders: number[][], updates: number[][]) => {
  const findWrongPos = (row: number[], updates: number[][]) => {
    const wrongPos: number[][] = [];
    row.filter((curr, idx) => {
      row.slice(idx + 1).filter((el) => {
        updates
          .filter(([x]) => el === x)
          .find(([x, y]) => {
            if (y === curr) {
              wrongPos.push([el, y]);
            }
          });
      });
    });

    return wrongPos;
  };

  const final: number[][] = [];

  updates.forEach((row) => {
    let result = findWrongPos(row, orders);

    while (result.length) {
      result.forEach(([x, y]) => {
        row[row.indexOf(x)] = y;
        row[row.indexOf(y)] = x;
      });

      result = findWrongPos(row, orders);

      if (result.length === 0) {
        final.push(row);
      }
    }
  });

  return final.reduce(
    (acc, curr) => acc + curr[Math.floor(curr.length / 2)],
    0,
  );
};

runner({
  path,
  solution: (input) => {
    const [ordersRaw, updatesRaw] = input.split('\n\n');
    const orders = ordersRaw.split('\n').map((el) => el.split('|').map(Number));
    const updates = updatesRaw
      .split('\n')
      .map((el) => el.split(',').map(Number))
      .slice(0, -1);

    return { p1: p1(orders, updates), p2: p2(orders, updates) };
  },
});
