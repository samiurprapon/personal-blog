package middlewares

import (
	"apps/auth/types"
	"apps/auth/utils"
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
)

func ErrorHandler(c *fiber.Ctx, err error) error {
	if errorsMap := utils.CustomErrorMessages(err); len(errorsMap) > 0 {
		return Error(c, fiber.StatusBadRequest, "Bad Request", errorsMap)
	}

	var fiberErr *fiber.Error
	if errors.As(err, &fiberErr) {
		return Error(c, fiberErr.Code, fiberErr.Message, nil)
	}

	return Error(c, fiber.StatusInternalServerError, "Internal Server Error", nil)
}

func NotFoundHandler(c *fiber.Ctx) error {
	return Error(c, fiber.StatusNotFound, "Endpoint Not Found", nil)
}

func Error(c *fiber.Ctx, statusCode int, message string, details interface{}) error {
	var errRes error
	if details != nil {
		errRes = c.Status(statusCode).JSON(types.ErrorDetails{
			Code:    statusCode,
			Status:  "error",
			Message: message,
			Errors:  details,
		})
	} else {
		errRes = c.Status(statusCode).JSON(types.CommonResponse{
			Code:    statusCode,
			Status:  "error",
			Message: message,
		})
	}

	if errRes != nil {
		logrus.Errorf("Failed to send error response : %+v", errRes)
	}

	return errRes
}
