/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import 'reflect-metadata';

export function UseMiddleware(middlewares: RequestHandler | RequestHandler[]) {
	return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		if (!originalMethod) return;

		const middlewareArray = Array.isArray(middlewares) ? middlewares : [middlewares];

		descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
			for (const middleware of middlewareArray) {
				await new Promise<void>((resolve, reject) => {
					middleware(req, res, (err) => {
						if (err) reject(err);
						else resolve();
					});
				});
			}

			// call the original method
			return originalMethod.apply(this, [req, res, next]);
		};

		return descriptor;
	};
}
