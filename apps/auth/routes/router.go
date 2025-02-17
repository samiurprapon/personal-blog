package routes

import (
	service "apps/auth/services"

	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App) {
	healthCheckService := service.NewHealthCheckService()

	v1 := app.Group("/v1")

	HealthCheckRoutes(v1, healthCheckService)
	// TODO: add another routes here...
}
