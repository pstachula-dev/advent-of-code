import { readInput } from "../utils.js";

const data = (await readInput('./input.js', Infinity, /\n\s/));
const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];


const part1 = ({ data, required }) => {
    return data.filter(row => required.every(req => row.match(req))).length;
}


console.log("P1", part1({ data, required }));