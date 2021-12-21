import { readInput } from "../../utils";

const data = await readInput("./2020/day4/input.js", Infinity, /\n\s/);
const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const part1 = ({ data, required }) => {
  return data.filter((row) => required.every((req) => row.match(req))).length;
};

console.log("P1", part1({ data, required }));
