import { runner } from '../../legacy/utils';

const segments = {
  zero: 6,
  one: 2, // unique
  two: 5,
  three: 5,
  four: 4, // unique
  five: 5,
  six: 6,
  seven: 3, // unique
  eight: 7, // unique
  nine: 6,
};

const segmentsArr = Object.values(segments);

// P1 =================================================================================
const part1 = (data: string[]) => {
  let result = 0;

  data.forEach((line) => {
    line.split(' ').forEach((word) => {
      if (segmentsArr.includes(word.length)) result++;
    });
  });

  return result;
};

runner(
  (input) => {
    const data = input.map((e) => e.split(' | ')[1]);

    return part1(data);
  },
  './2021/day8/input.txt',
  'time p1',
);

// 0:      1:      2:      3:      4:
//  aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
// ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
//  gggg    ....    gggg    gggg    ....

//  5:      6:      7:      8:      9:
//  aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
//  dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
//  gggg    gggg    ....    gggg    gggg

// 0/6/9

// acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
// cdfeb fcadb cdfeb cdbaf

//  5:
//  ..d..
// .    be.  <--- 2 B
// .gc    .
//  ..gc..
// .    .be
// .af    .
//  ..af..

//  0aaa
// 1    2
// b    c
//  3ddd
// 4    5
// e    f
//  6ggg

const numberSegments = {
  1: { 2: null, 5: null },
  2: { 0: null, 2: null, 3: null, 4: null, 6: null },
  3: { 0: null, 2: null, 3: null, 5: null, 6: null },
  4: { 1: null, 2: null, 3: null, 5: null },
  5: { 0: null, 1: null, 3: null, 5: null, 6: null },
  6: { 0: null, 1: null, 3: null, 4: null, 5: null, 6: null },
  7: { 0: null, 2: null, 5: null },
  8: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null },
  9: { 0: null, 1: null, 2: null, 3: null, 5: null, 6: null },
};

const currentSegment = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
};

// 1 -> 7
// 4 -> 8
// 2 exclue 1

// cbdgef - 0 6 9
// fgaecd - 0 6 9
// fdcge - 2 3
// agebfd  - 0 6 9
// fecdb - 2 3 5 // 3
// fabcd - 2 3 5 // 2

// cgeb - 4
// be - 1
// cfbegad - 8
// edb - 7

// fdgacbe - 8
// cefdb - 3
// cefbgd  - 9
// gcbe - 4

// const uniqueue = [2,4,3,7];

const replaceWord = (original: string, segment: string) => {
  const segmentChars = segment.split('');
  return original
    .split('')
    .filter((char) => !segmentChars.includes(char))
    .join('');
};

const crossWord = (words: string[], segment: string) => {
  return words.find((word) =>
    segment.split('').every((char) => word.split('').includes(char)),
  );
};

const notCrossWord = (words: string[], segment: string) => {
  const segmentWords = segment.split('');
  return (
    words.find((word) =>
      segmentWords.filter((char) => word.split('').includes(char)),
    ).length != segmentWords.length
  );
};

// P2 =================================================================================
const part2 = (data: string[][]) => {
  const finalResult = 0;

  for (const row of data) {
    const result = '';
    const [first, second] = row;

    const words = first.split(' ');

    // Find 1
    const one = words.find(({ length }) => length === 2);
    currentSegment[2] = one;
    currentSegment[5] = one;

    // Find 7
    const seven = words.find(({ length }) => length === 3);
    currentSegment[2] = currentSegment[2];
    currentSegment[5] = currentSegment[5];
    currentSegment[0] = replaceWord(seven, currentSegment[2]);
    currentSegment[0] = currentSegment[0];

    // Find 4
    const four = words.find(({ length }) => length === 4);
    const fourRest = replaceWord(four, currentSegment[2]);
    currentSegment[1] = fourRest;
    currentSegment[3] = fourRest;
    currentSegment[2] = currentSegment[2];
    currentSegment[5] = currentSegment[2];

    // Find 8
    const eight = words.find(({ length }) => length === 7);
    const eightRest = replaceWord(
      eight,
      Object.values(currentSegment).join(''),
    );
    currentSegment[4] = eightRest;
    currentSegment[6] = eightRest;

    // Find 2/3/5
    const twoThreeFive = words.filter(({ length }) => length === 5);
    const three = crossWord(twoThreeFive, seven);
    const two = notCrossWord(twoThreeFive, seven);
    const five = twoThreeFive.find((e) => ![three, two].includes(e));

    // Find 0/6/9
    const zeroSixNine = words.filter(({ length }) => length === 6);
    const nine = crossWord(zeroSixNine, one);
    const six = notCrossWord(zeroSixNine, one);
    const zero = zeroSixNine.find((e) => ![six, nine].includes(e));

    console.log(six, nine);
    const numbersCode2 = {
      [one]: 1,
      [two]: 2,
      [three]: 3,
      [four]: 4,
      [five]: 5,
      [six]: 6,
      [seven]: 7,
      [eight]: 8,
      [nine]: 9,
      [zero]: 0,
    };
    console.log(numbersCode2);

    // const numbersCode = {
    //   [one.split('').sort().join('')]: 1,
    //   [two.split('').sort().join('')]: 2,
    //   [three.split('').sort().join('')]: 3,
    //   [four.split('').sort().join('')]: 4,
    //   [five.split('').sort().join('')]: 5,
    //   [six.split('').sort().join('')]: 6,
    //   [seven.split('').sort().join('')]: 7,
    //   [eight.split('').sort().join('')]: 8,
    //   [nine.split('').sort().join('')]: 9,
    //   [zero.split('').sort().join('')]: 0,
    // };

    // second.split(' ').forEach(word => {
    //   result += numbersCode[word.split('').sort().join('')];
    // });

    // console.log(result);

    // finalResult += parseInt(result);
  }

  return 1;
};

runner(
  (input) => {
    return part2(input.splice(0, 1).map((e) => e.split(' | ')));
  },
  './2021/day8/input.txt',
  'time p2',
);
