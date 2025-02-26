import express, { json, urlencoded, Express as ExpressApp, Request, Response, NextFunction } from 'express';

import compression from '@/core/compression';
import cors from '@/core/cors';
import hpp from '@/core/hpp';
import morgan from '@/core/morgan';

import { SystemController } from '@/apps/system/system.controller';

import { ErrorMiddleware, NotFoundMiddleware } from '@/middlewares/error.middleware';
import { RouteDefinition } from '@/utils/interfaces/RouteDefinition';

export class Express {
	private static instance: Express;
	protected app: ExpressApp;

	constructor() {
		this.app = express();
		this.setConfig();
		this.setRoutes();
		this.setErrorHandler();
	}

	public static getInstance(): Express {
		return (this.instance ??= new Express());
	}

	protected setConfig(): void {
		this.app.disable('x-powered-by');
		this.app.set('trust proxy', 1);
		this.app.set('x-timestamp', Date.now());

		this.app.use(json({ limit: '1mb' }));
		this.app.use(urlencoded({ extended: true }));

		this.app.use(compression());
		this.app.use(cors());
		this.app.use(hpp());
		this.app.use(morgan());
	}

	protected async setRoutes(): Promise<void> {
		this.createRoutes([SystemController /* Add controllers here */], '/api/v1');
	}

	protected setErrorHandler(): void {
		// 4XX middleware
		this.app.use(NotFoundMiddleware);

		// 5XX middleware
		this.app.use(ErrorMiddleware);
	}

	public getApp(): ExpressApp {
		return this.app;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected createRoutes(controllers: any[], apiPrefix: string) {
		controllers.forEach((Controller) => {
			const controllerInstance = new Controller();

			const prefix = Reflect.getMetadata('prefix', Controller) || ''; // Get controller prefix
			const fullPrefix = apiPrefix + prefix; // Apply global prefix

			const routes: RouteDefinition[] = controllerInstance.getRoutes();

			routes.forEach((route) => {
				const path = fullPrefix + route.path; // Final route path
				this.app[route.method](path, (req: Request, res: Response, next: NextFunction) =>
					controllerInstance[route.methodName](req, res, next),
				);
			});
		});
	}
}

export default Express.getInstance().getApp();
