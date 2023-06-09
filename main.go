package main

import (
	"fmt"
	"html/template"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type Project struct {
	ProjectName string
	StartDate   string
	EndDate     string
	Description string
	bootStrap   bool
	css         bool
	javaScript  bool
	goLang      bool
}

var dataProject = []Project{
	{
		ProjectName: "Project Zero",
		StartDate:   "2023-01-01",
		EndDate:     "2023-01-02",
		Description: "Project 0 terdiri atas ...",
		bootStrap:   false,
		css:         true,
		javaScript:  false,
		goLang:      false,
	},
	{
		ProjectName: "Project One",
		StartDate:   "2023-01-04",
		EndDate:     "2023-01-06",
		Description: "Project 1 terdiri atas ...",
		bootStrap:   true,
		css:         true,
		javaScript:  false,
		goLang:      false,
	},
}

func main() {
	e := echo.New()

	e.Static("/public", "public")

	e.GET("/", home)

	e.POST("/submit-project", submitProject)
	e.POST("/delete-project/:id", deleteProject)

	e.Logger.Fatal(e.Start("localhost:5000"))
}

func home(c echo.Context) error {
	var tmpl, err = template.ParseFiles("views/index.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}
	projects := map[string]interface{}{
		"Projects": dataProject,
	}

	return tmpl.Execute(c.Response(), projects)
}

func submitProject(c echo.Context) error {
	projectName := c.FormValue("projectName")
	startDate := c.FormValue("startDate")
	endDate := c.FormValue("endDate")
	description := c.FormValue("description")
	bootStrap := c.FormValue("bootStrap")
	css := c.FormValue("css")
	javaScript := c.FormValue("javaScript")
	goLang := c.FormValue("goLang")

	println("Project Name:", projectName)
	println("Start Date:", startDate)
	println("End Date:", endDate)
	println("Description:", description)
	println("bootStrap:", bootStrap)
	println("css:", css)
	println("javaScript:", javaScript)
	println("goLang:", goLang)

	var newProject = Project{
		ProjectName: projectName,
		StartDate:   startDate,
		EndDate:     endDate,
		Description: description,
		bootStrap:   (bootStrap == "bootStrap"),
		css:         (css == "css"),
		javaScript:  (javaScript == "javaScript"),
		goLang:      (goLang == "goLang"),
	}

	dataProject = append(dataProject, newProject)

	fmt.Println(dataProject)

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func deleteProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	fmt.Println("Index : ", id)

	dataProject = append(dataProject[:id], dataProject[id+1:]...)

	return c.Redirect(http.StatusMovedPermanently, "/")
}
