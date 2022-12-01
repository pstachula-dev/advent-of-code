import { promises } from "fs";

export const readInput = async (path, limit, splitChar) =>
  (await promises.readFile(path, "utf8")).split(splitChar).slice(0, limit);

export const runner = async (callback: (arg: string[]) => void, path: string, label = 'time', splitChar = "\n", limit = Infinity) => {
  console.time(label)
  console.log(callback(await readInput(path, limit, splitChar)));
  console.timeEnd(label)
}
