package handlers

import (
	"net/http"
	"../models"
	"github.com/labstack/echo"
)

// StSampleData :
type StSampleData struct {
	SampleData string `json:"SampleData"`
}

// GetRecipe : Get
func GetRecipe(c echo.Context) error {
	return c.JSON(http.StatusOK, models.GetRecipeList())
}

// SampleFunc : Post
func SampleFunc(c echo.Context) error {
	param := new(StSampleData)
	if err := c.Bind(param); err != nil {
		return err
	}
	str := param.SampleData + "(この値はServerを経由しました)"
	return c.JSON(http.StatusOK, map[string]interface{}{"SampleData": str})
}