import { promises } from "fs";

export const readInput = async (path, limit = Infinity, splitChar = "\n") =>
  (await promises.readFile(path, "utf8")).split(splitChar).slice(0, limit);

export const runner = async (callback: (arg: string[]) => void, path: string) =>
  console.log(callback(await readInput(path)));
