package main

import (
	"aoc/utils"
	"fmt"
	"time"
	"unicode"
)

var input = utils.UtilReadFile("day03/input.txt")

var DOT = "."

func hasSymbol(chars []string) bool {
	for _, char := range chars {
		if char != DOT && !utils.StrIsInt(char) {
			return true
		}
	}
	return false
}

func Part1(data []string) int {
	var sum = 0

	for rowIdx, row := range data {
		var numberPart = ""
		var isSymbol = false

		for colIdx, char := range row {
			if unicode.IsDigit(char) {
				numberPart += string(char)

				if !isSymbol {
					var symbols = []string{}

					if colIdx > 0 {
						symbols = append(symbols, string(data[rowIdx][colIdx-1]))
					}

					if colIdx < len(row)-1 {
						symbols = append(symbols, string(data[rowIdx][colIdx+1]))
					}

					if rowIdx > 0 && colIdx < len(row)-1 {
						symbols = append(symbols, string(data[rowIdx-1][colIdx+1]),
							string(data[rowIdx-1][colIdx]))

						if colIdx > 0 {
							symbols = append(symbols, string(data[rowIdx-1][colIdx-1]))
						}
					}

					if rowIdx < len(row)-1 && colIdx < len(row)-1 {
						symbols = append(symbols, string(data[rowIdx+1][colIdx+1]),
							string(data[rowIdx+1][colIdx]))

						if colIdx > 0 {
							symbols = append(symbols, string(data[rowIdx+1][colIdx-1]))
						}
					}

					isSymbol = hasSymbol(symbols)
				}
			}

			var isNextWord = false

			if colIdx+1 >= len(row) {
				isNextWord = true
			} else {
				var nextChar = string(row[colIdx+1])
				isNextWord = nextChar == DOT || !utils.StrIsInt(nextChar)
			}

			if isNextWord {
				if isSymbol {
					sum += utils.StrToInt(numberPart)
				}
				numberPart = ""
				isSymbol = false
			}
		}
	}

	return sum
}

func main() {
	start := time.Now()
	fmt.Println("part1: ", Part1(input))
	fmt.Println(time.Since(start))
}
