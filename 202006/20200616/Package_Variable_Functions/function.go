package main

import "fmt"

// func add(x int, y int) int {
// 	return x + y
// }
// 以下でも同じ
func add(x, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}
