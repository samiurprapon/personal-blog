import 'reflect-metadata';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export function UseMiddleware(middlewares: RequestHandler | RequestHandler[]) {
	return function (_target: unknown, _key: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		if (!originalMethod) return;

		const middlewareArray = Array.isArray(middlewares) ? middlewares : [middlewares];

		descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
			for (const middleware of middlewareArray) {
				await new Promise<void>((resolve, reject) => {
					try {
						// if (res.headersSent) {
						// 	resolve(undefined);
						// 	return;
						// }

						middleware(req, res, (err) => {
							if (err) {
								// console.error(`[DEBUG] Middleware: ${middleware.name}`, err);
								reject(err);
								return;
							}

							resolve();
						});
					} catch (error) {
						reject(error);
					}

					// console.info(`[DEBUG] Middleware: ${middleware.name}`);
				});
			}

			// call the original method
			return originalMethod.apply(this, [req, res, next]);
		};

		return descriptor;
	};
}
