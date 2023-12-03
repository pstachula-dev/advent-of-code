package utils

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
)

func UtilReadFile(filename string) []string {
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	res := []string{}
	for scanner.Scan() {
		res = append(res, scanner.Text())
	}
	return res
}

func StrIsInt(s string) bool {
	_, err := strconv.Atoi(s)
	return err == nil
}

func StrToInt(s string) int {
	res, err := strconv.Atoi(string(s))

	if err != nil {
		panic(err)
	}

	return res
}

func Debug(s []string) {
	var json, _ = json.Marshal(s)
	fmt.Println(string(json))
}
