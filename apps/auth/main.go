package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"apps/auth/config"
	"apps/auth/core"
	"apps/auth/middlewares"
	"apps/auth/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	app := setupFiberApp()
	setupRoutes(app)

	address := fmt.Sprintf("%s:%d", config.AppHost, config.AppPort)

	// Channel to handle server errors
	serverErrors := make(chan error, 1)

	// Start server
	go startServer(app, address, serverErrors)

	// Handle graceful shutdown
	handleGracefulShutdown(ctx, app, serverErrors)
}

func setupFiberApp() *fiber.App {
	app := fiber.New(config.FiberConfig())

	// Middleware setup
	app.Use("/v1/auth", middlewares.LimiterConfig())
	app.Use(middlewares.LoggerConfig())
	app.Use(helmet.New())
	app.Use(compress.New())
	app.Use(cors.New())
	app.Use(middlewares.RecoverConfig())

	return app
}

func startServer(app *fiber.App, address string, errs chan<- error) {
	if err := app.Listen(address); err != nil {
		errs <- fmt.Errorf("error starting server: %w", err)
	}
}

func setupRoutes(app *fiber.App) {
	routes.Routes(app)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Auth Service Running")
	})

	app.Use(middlewares.NotFoundHandler)
}

func handleGracefulShutdown(ctx context.Context, app *fiber.App, serverErrors <-chan error) {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	select {
	case err := <-serverErrors:
		core.Log.Fatalf("Server error: %v", err)
	case <-quit:
		core.Log.Info("Shutting down server...")
		if err := app.Shutdown(); err != nil {
			core.Log.Fatalf("Error during server shutdown: %v", err)
		}
	case <-ctx.Done():
		core.Log.Info("Server exiting due to context cancellation")
	}

	core.Log.Info("Server exited")
}
