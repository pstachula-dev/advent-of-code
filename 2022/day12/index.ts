/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-for-in-array */
import {
  INPUT_PATH,
  runner,
  splitIntoGroups,
  splitToFlatArray,
} from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type Node = Record<string, number>;
type Graph = Record<string, Node>;
type HeatGraph = { node: string; weight: number }[];

const graph: Graph = {
  a: { b: 4, c: 2 },
  b: { d: 3, a: 4, c: 1, e: 2 },
  c: { b: 1, a: 2 },
  d: { b: 3, e: 5 },
  e: { d: 5, b: 2 },
};

const data2 = [
  ['S', 'a', 'b'],
  ['a', 'b', 'c'],
  ['a', 'c', 'c'],
];

const constructGraph = (input: string[][]) => {
  const graph: Graph = {};
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      const node = input[y][x];
      const point = `${y}x${x}`;
      graph[point] = {
        [input[y]?.[x + 1] && `${y}x${x + 1}`]:
          input[y]?.[x + 1]?.charCodeAt(0),
        [input[y]?.[x - 1] && `${y}x${x - 1}`]:
          input[y]?.[x - 1]?.charCodeAt(0),
        [input[y + 1]?.[x] && `${y + 1}x${x}`]:
          input[y + 1]?.[x]?.charCodeAt(0),
        [input[y - 1]?.[x] && `${y - 1}x${x}`]:
          input[y - 1]?.[x]?.charCodeAt(0),
      };
      delete graph[point]['undefined'];
    }
  }

  return graph;
};

// Part 1
runner({
  path,
  solution: (input) => {
    const data = splitToFlatArray({ input }).map((row) => row.split(''));

    const findPath = (graph: Graph, start: string, end: string) => {
      const iterator = 0;
      const rest = Object.keys(graph);
      let nodesQueue: HeatGraph = [
        {
          node: start,
          weight: 0,
        },
        ...rest
          .slice(1, rest.length)
          .map((node) => ({ node, weight: Infinity })),
      ];
      const vistedNodes: HeatGraph = [{ node: start, weight: 0 }];
      const paths: HeatGraph = [...nodesQueue];

      while (nodesQueue.length) {
        nodesQueue = paths
          .filter((p) => nodesQueue?.find((n) => n.node === p.node))
          .sort((a, b) => a.weight - b.weight);
        const currentNode = nodesQueue.shift();

        if (!currentNode?.node) continue;
        if (currentNode && !graph[currentNode.node]) continue;

        const children = graph[currentNode.node];
        const entries = Object.entries(children);

        for (const [child, val] of entries) {
          const childNode = paths.find((p) => p.node === child);
          const parent = paths.find((p) => p.node === currentNode.node);

          if (childNode && parent) {
            console.log('\nStart', `${parent.node} -> ${child}`);

            const totalWeight = parent.weight + val;
            const newWeight =
              childNode.weight < totalWeight ? childNode.weight : totalWeight;

            childNode.weight =
              childNode.weight === Infinity ? totalWeight : newWeight;
          }
        }

        if (!nodesQueue.includes(currentNode)) {
          vistedNodes.push(currentNode);
        }
      }
      console.log(iterator + 1);
      return paths;
    };

    // console.log(findPath(graph, 'a', 'e'));

    const x = constructGraph(data);
    console.log(x);
    console.log(findPath(x, '0x0', '2x5'));

    return 0;
  },
});

// Part 2
runner({
  path,
  solution: (input) => {
    const data = splitIntoGroups({
      input,
      parser: (e) => Number(e),
    });

    return 0;
  },
});
