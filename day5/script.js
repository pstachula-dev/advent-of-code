import { readInput } from "../utils.js";

const data = (await readInput('./input.js', Infinity));

const maxCol = 128;
const maxRow = 8;
const ZONES = {
    F: 'F',
    L: 'L',
};

const getSeatIndex = ({ list, maxNum, isLower }) => {
    let index = maxNum;
    let seatRight = maxNum;
    let seatLeft = 0;

    for (const el of list) {
        index = index / 2;

        if (el === isLower) {
            seatRight = seatRight - index;
        } else if (index) {
            seatLeft = seatLeft + index;
        }

        if (index === 1) {
            return el === isLower ? seatLeft : seatRight - 1;
        }
    }
}

const part1 = ({ data, maxCol, maxRow }) => {
    return Math.max(...data.map(row => {
        const bfStr = row.substr(0, 7);
        const rlStr = row.substr(7, 3);

        const colIndex = getSeatIndex({
            list: [...bfStr],
            maxNum: maxCol,
            isLower: ZONES.F,
        });

        const rowIndex = getSeatIndex({
            list: [...rlStr],
            maxNum: maxRow,
            isLower: ZONES.L,
        });

        return colIndex * 8 + rowIndex;
    }));
}


console.log("P1", part1({ data, maxCol, maxRow }));