import { INPUT_PATH, runner, splitToFlatArray, sum } from '../../lib/utils';

const path = `${__dirname}/${INPUT_PATH}`;

type FilesTree = {
  parent: FilesTree | null;
  name: string;
  size: number;
  children: FilesTree[];
  isDir?: boolean;
  totalSize?: number;
};

const LIMIT_SIZE = 100000;
const TOTAL_SPACE = 70000000;
const UNUSED_SPACE = 30000000;

const parseTreeSizes = (input: string): number[] => {
  const rootTree: FilesTree = {
    parent: null,
    isDir: true,
    name: '/',
    size: 0,
    children: [],
  };

  let currentDir = rootTree;

  splitToFlatArray({ input }).map((row) => {
    const [type, name, arg] = row.split(' ');
    const isCommand = type === '$';

    if (isCommand && name === 'cd') {
      currentDir =
        arg === '..' && currentDir.parent
          ? currentDir.parent
          : currentDir.children?.find(({ name }) => name === arg) || currentDir;
    }

    if (!isCommand) {
      const isDir = type === 'dir';
      currentDir.children?.push({
        isDir,
        name,
        parent: currentDir,
        children: [],
        totalSize: 0,
        size: isDir ? 0 : parseInt(type, 10),
      });
    }
  });

  const getSize = (tree: FilesTree): number => {
    return !tree.isDir
      ? tree.size
      : tree.children
          ?.map((el) => getSize(el))
          .reduce((prev, curr) => prev + curr, 0) || 0;
  };

  const countDirs: number[] = [];

  const treeCounter = (tree: FilesTree) => {
    if (tree.isDir) {
      countDirs.push(getSize(tree));
      tree.children.forEach((el) => treeCounter(el));
    }
  };

  treeCounter(rootTree);
  return countDirs;
};

// Part 1
runner({
  path,
  solution: (input) => {
    // 2104783
    return parseTreeSizes(input)
      .filter((dirSize) => dirSize < LIMIT_SIZE)
      .reduce(sum);
  },
});

// Part 2
runner({
  path,
  solution: (input) => {
    const sizes = parseTreeSizes(input).sort((a, b) => b - a);
    const requiredSpace = UNUSED_SPACE - (TOTAL_SPACE - sizes[0]);

    return sizes.filter((el) => requiredSpace <= el).sort((a, b) => a - b)[0];
  },
});
