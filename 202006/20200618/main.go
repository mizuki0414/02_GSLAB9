package main

import (
	"./handlers"
	"github.com/labstack/echo"
)

func main() {
	e := echo.New()
	e.File("/", "views/index.html")
	e.GET("/recipe", handlers.GetRecipe)
	e.POST("/sample", handlers.SampleFunc)
	e.Start(":8080")
}