import { readInput } from "../../legacy/utils";

const data = await readInput("./2020/day2/input.js");

const part1 = ({ data }) => {
  return data.filter((el) => {
    const [min, max, letter, , password] = el.split(/[ :-]/);
    const passMatchLength = password.match(new RegExp(letter, "g"))?.length;

    return passMatchLength >= min && passMatchLength <= max;
  }).length;
};

console.log("P1", part1({ data }));

const part2 = ({ data }) => {
  return data.filter((el) => {
    const [first, second, letter, , password] = el.split(/[ :-]/);

    return (
      [password[first - 1] === letter, password[second - 1] === letter].filter(
        Boolean
      ).length === 1
    );
  }).length;
};

console.log("P2:", part2({ data }));
