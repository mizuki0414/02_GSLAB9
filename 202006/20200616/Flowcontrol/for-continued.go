package main

import "fmt"

func main() {
	sum := 1
	for ; sum < 1000; {
		sum +=sum
	}
	fmt.Println(sum)
}

// テスト
// func main() {
// 	for {
// 	fmt.Println("test")
// 	}
// }
