import { runner } from "../../utils";

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

const segments = {
  zero: 6,
  one: 2,     // uniq
  two: 5,
  three: 5,
  four: 4,    // uniq
  six: 6,
  seven: 3,   // uniq
  eight: 7,   // uniq
  nine: 6
};

// be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
// fdgacbe cefdb cefbgd gcbe

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
  1: [2, 5],
  2: [0, 2, 3, 4, 6],
  3: [0, 2, 3, 5, 6],
  4: [1, 2, 3, 5],
  5: [0, 1, 3, 5, 6],
  6: [0, 1, 3, 4, 5, 6],
  7: [0, 2, 5],
  8: [0, 1, 2, 3, 4, 5, 6],
  9: [0, 1, 2, 3, 6, 6],
}

const currentSegment = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
}

// 1 -> 7
// 4 -> 8

// 2 exclue 1
// 

// cbdgef - 0 6 9
// fgaecd - 0 6 9
// fdcge - 2 3
// agebfd  - 0 6 9
// fecdb - 2 3 // 3
// fabcd - 2 3 // 2

// cgeb - 4
// be - 1
// cfbegad - 8
// edb - 7

// fdgacbe - 8
// cefdb - 2 3
// cefbgd  - 0 6 9
// gcbe - 4 


const segmentsArr = Object.values(segments);

// P1 =================================================================================
const part1 = (data: string[]) => {
  let result = 0;

  data.forEach(line => {
    line.split(' ').forEach(word => {
      if (segmentsArr.includes(word.length)) result++
    });
  });

  return result;
};

runner((input) => {
  const data = input.map((e) => e.split(' | ')[1]);

  return part1(data);
}, "./2021/day8/input.txt", 'time p1');



// P2 =================================================================================
const part2 = (data: number[]) => {
};

runner((input) => {
  const data = input.map(e => parseInt(e));

  return part2(data);
}, "./2021/day8/input.txt", 'time p2');
