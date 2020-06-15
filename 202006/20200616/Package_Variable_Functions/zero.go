package main

import "fmt"

// ゼロ値は型によって以下のように与えられます:
// 数値型(int,floatなど): 0
// bool型: false
// string型: "" (空文字列( empty string ))

func main() {
	var i int
	var f float64
	var b bool
	var s string
	fmt.Printf("%v %v %v %q\n", i, f, b, s)
}
