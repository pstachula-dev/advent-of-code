import { readFile } from 'fs/promises';

export const readInput = async (path, limit = Infinity) =>
    (await readFile(path, 'utf8'))
    .split('\n')
    .slice(0, limit);