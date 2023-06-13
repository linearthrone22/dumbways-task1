package main

import (
	"context"
	"fmt"
	"golangtest/connection"
	"html/template"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

type Project struct {
	ID          int
	ProjectName string
	StartDate   time.Time
	EndDate     time.Time
	Duration    string
	Description string
	Bootstrap   bool
	Css         bool
	Javascript  bool
	Golang      bool
}

var dataProject = []Project{
	// {
	// 	ID:          5,
	// 	ProjectName: "Project Zero",
	// 	Description: "Project 0 terdiri atas ...",
	// },
	// {
	// 	ID:          4,
	// 	ProjectName: "Project One",
	// 	Description: "Project 1 terdiri atas ...",
	// },
}

func main() {
	connection.DatabaseConnect()

	e := echo.New()

	e.Static("/public", "public")

	e.GET("/", home)
	e.GET("/edit-project/:id", editProjectForm)
	e.GET("/detail-project/:id", detailProject)

	e.POST("/add-project", addProject)
	e.POST("/edit-project/:id", editProject)
	e.POST("/delete-project/:id", deleteProject)

	e.Logger.Fatal(e.Start("localhost:5000"))
}

func home(c echo.Context) error {
	data, _ := connection.Conn.Query(context.Background(),
		"SELECT id, name, start_date, end_date, description, bootstrap, css, javascript, golang FROM tb_projects")

	var dataProject []Project
	for data.Next() {
		var each = Project{}

		err := data.Scan(&each.ID, &each.ProjectName, &each.StartDate, &each.EndDate, &each.Description, &each.Bootstrap, &each.Css, &each.Javascript, &each.Golang)
		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusInternalServerError, map[string]string{"Message": err.Error()})
		}

		each.Duration = hitungDurasi(each.StartDate, each.EndDate)

		dataProject = append(dataProject, each)
	}

	projects := map[string]interface{}{
		"Projects": dataProject,
	}

	// fmt.Println(dataProject)
	var tmpl, err = template.ParseFiles("views/index.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	return tmpl.Execute(c.Response(), projects)
}

func editProjectForm(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var Edit = Project{}

	err := connection.Conn.QueryRow(context.Background(),
		"SELECT id, name, start_date, end_date, description, bootstrap, css, javascript, golang FROM tb_projects WHERE id=$1", id).Scan(
		&Edit.ID, &Edit.ProjectName, &Edit.StartDate, &Edit.EndDate, &Edit.Description, &Edit.Bootstrap, &Edit.Css, &Edit.Javascript, &Edit.Golang,
	)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	start := Edit.StartDate.Format("2006-01-02")
	end := Edit.EndDate.Format("2006-01-02")

	data := map[string]interface{}{
		"Project":   Edit,
		"StartDate": start,
		"EndDate":   end,
	}

	var tmpl, errTemplate = template.ParseFiles("views/project-edit.html")

	if errTemplate != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	return tmpl.Execute(c.Response(), data)
}

func editProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	// Extract form values
	projectName := c.FormValue("projectName")
	startDate := c.FormValue("startdate")
	endDate := c.FormValue("enddate")
	description := c.FormValue("description")
	bootstrap := c.FormValue("Bootstrap") != ""
	css := c.FormValue("Css") != ""
	javascript := c.FormValue("Javascript") != ""
	golang := c.FormValue("Golang") != ""

	// Update project in the database
	_, err := connection.Conn.Exec(
		context.Background(),
		"UPDATE tb_projects SET name=$1, start_date=$2, end_date=$3, description=$4, bootstrap=$5, css=$6, javascript=$7, golang=$8  WHERE id=$9",
		projectName, startDate, endDate, description, bootstrap, css, javascript, golang, id,
	)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func addProject(c echo.Context) error {
	projectName := c.FormValue("projectName")
	startDate := c.FormValue("startDate")
	endDate := c.FormValue("endDate")
	description := c.FormValue("description")
	bootstrap := c.FormValue("bootstrap") != ""
	css := c.FormValue("css") != ""
	javascript := c.FormValue("javascript") != ""
	golang := c.FormValue("golang") != ""

	_, err := connection.Conn.Exec(
		context.Background(),
		"INSERT INTO tb_projects (name, start_date, end_date, description, bootstrap, css, javascript, golang) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
		projectName, startDate, endDate, description, bootstrap, css, javascript, golang,
	)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func deleteProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	fmt.Println("ID Deleted: ", id)

	_, err := connection.Conn.Exec(context.Background(), "DELETE FROM tb_projects WHERE id=$1", id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func detailProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var ProjectDetail = Project{}

	err := connection.Conn.QueryRow(context.Background(), "SELECT id, name, start_date, end_date, description, bootstrap, css, javascript, golang FROM tb_projects WHERE id=$1", id).Scan(
		&ProjectDetail.ID, &ProjectDetail.ProjectName, &ProjectDetail.StartDate, &ProjectDetail.EndDate, &ProjectDetail.Description, &ProjectDetail.Bootstrap, &ProjectDetail.Css, &ProjectDetail.Javascript, &ProjectDetail.Golang,
	)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	ProjectDetail.Duration = hitungDurasi(ProjectDetail.StartDate, ProjectDetail.EndDate)

	data := map[string]interface{}{
		"Project":   ProjectDetail,
		"StartDate": ProjectDetail.StartDate.Format("2 January 2006"),
		"EndDate":   ProjectDetail.EndDate.Format("2 January 2006"),
	}

	var tmpl, errTemplate = template.ParseFiles("views/project-detail.html")

	if errTemplate != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	return tmpl.Execute(c.Response(), data)
}

func hitungDurasi(startDate, endDate time.Time) string {
	duration := endDate.Sub(startDate)

	years := int(duration.Hours() / 24 / 365)
	duration -= time.Duration(years) * 24 * time.Hour * 365

	months := int(duration.Hours() / 24 / 30)
	duration -= time.Duration(months) * 24 * time.Hour * 30

	days := int(duration.Hours() / 24)

	var durationStr string

	if years > 0 {
		durationStr += fmt.Sprintf("%d tahun", years)
	}

	if months > 0 {
		if durationStr != "" {
			durationStr += ", "
		}
		durationStr += fmt.Sprintf("%d bulan", months)
	}

	if years == 0 && months == 0 && days > 0 {
		if durationStr != "" {
			durationStr += ", "
		}
		durationStr += fmt.Sprintf("%d hari", days)
	}

	return durationStr
}
