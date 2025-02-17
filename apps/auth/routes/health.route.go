package routes

import (
	controller "apps/auth/controllers"
	service "apps/auth/services"

	"github.com/gofiber/fiber/v2"
)

func HealthCheckRoutes(v1 fiber.Router, h service.HealthCheckService) {
	healthCheckController := controller.NewHealthCheckController(h)

	healthCheck := v1.Group("/health")
	healthCheck.Get("/check", healthCheckController.Check)
}
