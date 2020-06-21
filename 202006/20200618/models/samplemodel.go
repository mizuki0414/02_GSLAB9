package models

//  Recipe :扱うデータ
type Recipe struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	URL  string `json:"url"`
}

//  StRecipeLIst : Recipeの配列
type StRecipeList struct {
	RecipeList []Recipe `json:"items"`
}

// GetRecipeList : データ生成
func GetRecipeList() (rc StRecipeList) {
	rc = StRecipeList{
		[]Recipe{
			{1, "伊勢海老の鬼殻焼き~素味噌仕立て~", "http://blog.livedoor.jp/cuisinier_t/archives/1075638059.html"},
			{2, "豚の角煮~和風蜂蜜ソース~", "http://blog.livedoor.jp/cuisinier_t/archives/1074245832.html"},
			{3, "連子鯛と筍の木の芽焼き", "http://blog.livedoor.jp/cuisinier_t/archives/1065387087.html"},
			{4, "test4", "http://blog.livedoor.jp/cuisinier_t/archives/1065387087.html"},
		},
	}
	return
}
