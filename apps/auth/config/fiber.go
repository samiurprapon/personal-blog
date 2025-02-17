package config

import (
	"apps/auth/middlewares"

	"github.com/bytedance/sonic"
	"github.com/gofiber/fiber/v2"
)

func FiberConfig() fiber.Config {
	return fiber.Config{
		Prefork:       IsProd,
		CaseSensitive: true,
		// ServerHeader:  "Fiber",
		AppName:      "Auth Service",
		ErrorHandler: middlewares.ErrorHandler,
		JSONEncoder:  sonic.Marshal,
		JSONDecoder:  sonic.Unmarshal,
	}
}
