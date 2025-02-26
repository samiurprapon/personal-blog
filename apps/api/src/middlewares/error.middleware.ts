import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import HttpException from '@/utils/exceptions/HttpException';
import CustomHttpException from '@/utils/exceptions/CustomHttpException';

export const NotFoundMiddleware = async (_eq: Request, _res: Response, next: NextFunction) => {
	const error: HttpException = new HttpException(StatusCodes.NOT_FOUND, 'Not found');

	return next(error);
};

export const ErrorMiddleware = async (
	error: HttpException | CustomHttpException | Error,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction,
) => {
	try {
		const status: number = (error as HttpException).status || StatusCodes.INTERNAL_SERVER_ERROR;
		const message: string = error.message || 'Something went wrong';

		if (error instanceof CustomHttpException) {
			return res.status(status).json({
				message: message,
				...(error.additionalInfo as object),
			});
		}

		return res.status(status).json({
			message: message,
		});
	} catch (error: unknown) {
		console.error('Error middleware : ', error);

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: (error as Error).message,
		});
	}
};
