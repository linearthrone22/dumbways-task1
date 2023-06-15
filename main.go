package main

import (
	"context"
	"fmt"
	"golangtest/connection"
	"golangtest/middleware"
	"html/template"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
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
	Image       string
	UserID      int
}

type User struct {
	ID       int
	Name     string
	Email    string
	Password string
}

type SessionData struct {
	IsLogin bool
	Name    string
}

var userData = SessionData{}

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
	e.Static("/uploads", "uploads")

	e.GET("/", home)
	e.GET("/edit-project/:id", editProjectForm)
	e.GET("/detail-project/:id", detailProject)

	e.Use(session.Middleware(sessions.NewCookieStore([]byte("sessions"))))

	e.POST("/add-project", middleware.UploadFile(addProject))
	e.POST("/edit-project/:id", editProject)
	e.POST("/delete-project/:id", deleteProject)
	e.POST("/login", login)
	e.POST("/register", register)
	e.POST("/logout", logout)

	e.Logger.Fatal(e.Start("localhost:5000"))
}

func home(c echo.Context) error {
	data, _ := connection.Conn.Query(context.Background(),
		"SELECT id, name, start_date, end_date, description, bootstrap, css, javascript, golang, image FROM tb_projects ORDER BY id DESC")

	var dataProject []Project
	for data.Next() {
		var each = Project{}

		err := data.Scan(&each.ID, &each.ProjectName, &each.StartDate, &each.EndDate, &each.Description, &each.Bootstrap, &each.Css, &each.Javascript, &each.Golang, &each.Image)
		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusInternalServerError, map[string]string{"Message": err.Error()})
		}

		each.Duration = hitungDurasi(each.StartDate, each.EndDate)

		dataProject = append(dataProject, each)
	}

	sess, _ := session.Get("session", c)

	if sess.Values["isLogin"] != true {
		userData.IsLogin = false
	} else {
		userData.IsLogin = sess.Values["isLogin"].(bool)
		userData.Name = sess.Values["name"].(string)
	}

	projects := map[string]interface{}{
		"Projects":     dataProject,
		"FlashStatus":  sess.Values["status"],
		"FlashMessage": sess.Values["message"],
		"DataSession":  userData,
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

	image := c.Get("dataFile").(string)

	_, err := connection.Conn.Exec(
		context.Background(),
		"INSERT INTO tb_projects (name, start_date, end_date, description, bootstrap, css, javascript, golang, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
		projectName, startDate, endDate, description, bootstrap, css, javascript, golang, image,
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

	err := connection.Conn.QueryRow(context.Background(), "SELECT id, name, start_date, end_date, description, bootstrap, css, javascript, golang, image FROM tb_projects WHERE id=$1", id).Scan(
		&ProjectDetail.ID, &ProjectDetail.ProjectName, &ProjectDetail.StartDate, &ProjectDetail.EndDate, &ProjectDetail.Description, &ProjectDetail.Bootstrap, &ProjectDetail.Css, &ProjectDetail.Javascript, &ProjectDetail.Golang, &ProjectDetail.Image,
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

func register(c echo.Context) error {
	err := c.Request().ParseForm()
	if err != nil {
		log.Fatal(err)
	}
	name := c.FormValue("userName")
	email := c.FormValue("userEmail")
	password := c.FormValue("userPassword")

	passwordHash, _ := bcrypt.GenerateFromPassword([]byte(password), 11)

	_, err = connection.Conn.Exec(context.Background(), "INSERT INTO tb_users(name, email, password) VALUES ($1, $2, $3)", name, email, passwordHash)

	if err != nil {
		redirectWithMessage(c, "Register failed.", false, "/")
	}

	// Redirect to the login modal with a success message
	return redirectWithMessage(c, "Register success! Please log in.", true, "/")
}

func login(c echo.Context) error {
	err := c.Request().ParseForm()
	if err != nil {
		log.Fatal(err)
	}
	email := c.FormValue("userEmail")
	password := c.FormValue("userPassword")

	user := User{}
	err = connection.Conn.QueryRow(context.Background(), "SELECT * FROM tb_users WHERE email=$1", email).Scan(&user.ID, &user.Name, &user.Email, &user.Password)
	if err != nil {
		return redirectWithMessage(c, "Email Incorrect", false, "/")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return redirectWithMessage(c, "Password Incorrect", false, "/")
	}

	sess, _ := session.Get("session", c)
	sess.Options.MaxAge = 10800
	sess.Values["message"] = "Logged in!"
	sess.Values["status"] = true
	sess.Values["name"] = user.Name
	sess.Values["email"] = user.Email
	sess.Values["id"] = user.ID
	sess.Values["isLogin"] = true
	sess.Save(c.Request(), c.Response())

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func logout(c echo.Context) error {
	sess, _ := session.Get("session", c)
	sess.Options.MaxAge = -1
	sess.Save(c.Request(), c.Response())

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func redirectWithMessage(c echo.Context, message string, status bool, path string) error {
	sess, _ := session.Get("session", c)
	sess.Values["message"] = message
	sess.Values["status"] = status
	sess.Save(c.Request(), c.Response())
	return c.Redirect(http.StatusMovedPermanently, path)
}
