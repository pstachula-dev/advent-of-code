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
  console.time(label)
  console.log(callback(data));
  console.timeEnd(label)
}

export const splitToFlatArray = ({ 
    input,
    splitChar = "\n",
    toNumber = false,
    limit = Infinity
  } : { 
    input: string;
    splitChar?: SplitChar;
    toNumber?: boolean;
    limit?: number
  }) => {  
  return input
    .split(splitChar)
    .map(el => toNumber ? Number(el) : el)
    .slice(0, limit);
}

export const splitIntoGroups = ({ 
    input,
    splitGroupChar = "\n\n",
    splitChar = "\n",
    toNumber = false,
    limit = Infinity
  } : { 
    input: string;
    splitGroupChar?: SplitChar;
    splitChar?: SplitChar;
    toNumber?: boolean;
    limit?: number
}) => {  
  return input
    .split(splitGroupChar)
    .map(el => {
      return el
        .split(splitChar)
        .map(e => toNumber ? Number(e) : e)
        .slice(0, limit);
    });
}
