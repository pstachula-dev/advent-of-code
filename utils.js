import { readFile } from 'fs/promises';

export const readInput = async (path, limit = Infinity, splitChar = '\n') =>
    (await readFile(path, 'utf8'))
    .split(splitChar)
    .slice(0, limit);