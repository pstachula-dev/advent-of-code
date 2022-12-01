import { promises } from "fs";

export const readInput = async ({ path, limit, splitChar }) => {
  return (await promises.readFile(path, "utf8"))
}
  
export type SplitChar = "\n" | "\n\n";

export const runner = async ({
    callback, 
    path, 
    label = 'time', 
    limit = Infinity,
    splitChar = "\n",
  }: {
    callback: (arg: string) => void;
    path: string;
    label?: string; 
    limit?: number;
    splitChar?: SplitChar;
  }) => {
  const data = await readInput({ path, limit, splitChar });
  performance.mark(`${label}-start`);
  console.log('Result:', callback(data));
  performance.mark(`${label}-stop`);
  console.log('Bench:', performance.measure("Time", `${label}-start`, `${label}-stop`).duration, 'ms');
}

export const splitToFlatArray = <T extends string | number = string>({ 
    input,
    splitChar = "\n",
    limit = Infinity,
    parser = (e) => e as T,
  } : { 
    input: string;
    splitChar?: SplitChar;
    toNumber?: boolean;
    limit?: number
    parser: (data: string) => T
  }) => {  
  return input
    .split(splitChar)
    .map(parser)
    .slice(0, limit);
}

export const splitIntoGroups = <T extends string | number = string>({ 
    input,
    splitGroupChar = "\n\n",
    splitChar = "\n",
    limit = Infinity,
    parser = (e) => e as T
  } : { 
    input: string;
    splitGroupChar?: SplitChar;
    splitChar?: SplitChar;
    limit?: number
    parser?: (data: string) => T
}) => {  
  return input
    .split(splitGroupChar)
    .map(el => {
      return el
        .split(splitChar)
        .map(parser)
        .slice(0, limit);
    });
}
