package main

import (
	"fmt"
	"math"
)

// 平方根を求める関数
func Sqrt(x float64) float64 {

	z := 1.0    // 開始推測値
	res := 0.0  // ニュートン法の結果値

	for {

		// ニュートン法による演算
		res = z - ( z*z - x ) / ( 2*z )

		// 推測値と結果値の誤差が 0.001 未満ならループ終了
		if math.Abs(res - z) < 0.0000000000000001 { break }  // → math.Abs は絶対値を求めるための関数

		// デバック用出力
		fmt.Printf("Sqrt x   >>> %f\n", x)
		fmt.Printf("Sqrt z   >>> %f\n", z)
		fmt.Printf("Sqrt res >>> %f\n", res)
		fmt.Printf("Sqrt (z - x) >>> %f\n\n", z- x)

		// 結果値を推測値として更新
		z = res
	}

	// 結果値を返却
	return res

}

func main() {
	fmt.Println(Sqrt(2)) // 平方根を計算する関数を呼ぶ
}