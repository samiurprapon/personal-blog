import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validateRequest = (schema: ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			// Validate the request body
			schema.parse(req.body);

			next(); // Proceed to the next middleware/route handler if valid
		} catch (error) {
			// Return a 400 response with validation error details
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: 'Validation Error',
				errors: (error as z.ZodError).errors,
			});
		}
	};
};
