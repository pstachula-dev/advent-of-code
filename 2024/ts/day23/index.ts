import {
  INPUT_PATH,
  runner,
  SAMPLE_PATH,
  splitLines,
} from '../../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type Graph = Map<string, Set<string>>;

const getGraph = (data: string[][]) => {
  const graph: Graph = new Map();
  for (const [left, right] of data) {
    if (!graph.has(left)) graph.set(left, new Set());
    if (!graph.has(right)) graph.set(right, new Set());
    graph.get(left)!.add(right);
    graph.get(right)!.add(left);
  }
  return graph;
};

const solution = (input: string) => {
  const data = splitLines(input).map((r) => r.split('-'));
  const connections: Set<string> = new Set();
  const graph = getGraph(data);

  for (const [node1, node2level] of graph) {
    if (!node1.startsWith('t')) continue;

    for (const node2 of node2level) {
      for (const node3 of graph.get(node2) || new Set()) {
        for (const node4 of graph.get(node3) || new Set()) {
          if (node4 === node1) {
            connections.add([node1, node2, node3].sort().join(','));
          }
        }
      }
    }
  }

  return connections.size;
};

const hasAllConnetions = (root: string, rest: Set<string>, graph: Graph) => {
  const children = graph.get(root) || new Set();
  return Array.from(rest).every(
    (vertex) => vertex === root || children.has(vertex),
  );
};

const solution2 = (input: string) => {
  const data = splitLines(input).map((r) => r.split('-'));
  let connections: string[] = [];
  const graph = getGraph(data);
  const vertexHeads = Array.from(graph.keys());

  for (const head of vertexHeads) {
    const curr: string[] = [head];
    const headChildren = graph.get(head) || new Set();

    for (const child of headChildren) {
      const children = graph.get(child) || new Set();

      if (curr.every((vertex) => children.has(vertex))) {
        curr.push(child);
      }
    }

    if (connections.length < curr.length) connections = curr;
  }

  return connections.sort().join();
};

runner({
  path,
  name: 'Part1',
  solution: (input) => solution(input),
});

runner({
  path,
  name: 'Part2',
  solution: (input) => solution2(input),
});
