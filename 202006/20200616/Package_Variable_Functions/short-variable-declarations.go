package main

import "fmt"

func main() {
	var i, j int = 1, 2
	// 暗黙的変数宣言は、関数の中だけ可能
	k := 3
	c, python, java := true, false, "no!"

	fmt.Println(i, j, k, c, python, java)
}
