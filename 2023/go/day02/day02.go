package main

import (
	"aoc/utils"
	"fmt"
	"strings"
	"time"
)

var input = utils.UtilReadFile("day02/input.txt")

func Part1(data []string) int {
	var sum = 0
	// var colors = map[string]int{"red": 12, "green": 13, "blue": 14}

	for _, line := range data {
		var row = strings.Split(line, ": ")
		// var _id = row[0]
		var games = strings.Split(row[1], "; ")
		for _, game := range games {
			var group = strings.Split(game, " ")
			utils.Debug(group)

			// for _, color := range group {
			// 	var val = strings.Trim(color, ", ")[0]
			// 	fmt.Println(val)
			// }

			// var colorType = strings.Split(game, " ")[0]
			// fmt.Println(colorType)
		}
		// var game = strings.Split(row[1], ", ")

	}

	return sum
}

func main() {
	start := time.Now()
	fmt.Println("part1: ", Part1(input))
	fmt.Println(time.Since(start))
}
