package main

import (
	"aoc/utils"
	"fmt"
	"strconv"
	"time"
	"unicode"
)

var input = utils.UtilReadFile("day01/input.txt")

func Part1(data []string) int {
	var sum = 0
	for _, line := range data {
		var numbers = []string{}

		for _, char := range line {
			if unicode.IsDigit(char) {
				numbers = append(numbers, string(char))
			}
		}

		var num, _ = strconv.Atoi(numbers[0] + numbers[len(numbers)-1])
		sum += num
	}

	return sum
}

func main() {
	start := time.Now()
	fmt.Println("part1: ", Part1(input))
	fmt.Println(time.Since(start))
}
