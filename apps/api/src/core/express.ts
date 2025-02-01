/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { json, urlencoded, Express as ExpressApp, Request, Response } from 'express';

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
		this.createRoutes([SystemController /* Add controllers here */]);
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

	protected createRoutes(controllers: any[]) {
		controllers.forEach((controllerClass) => {
			const controllerInstance = new controllerClass();

			const prefix = Reflect.getMetadata('prefix', controllerClass);

			const routes: RouteDefinition[] = controllerInstance.getRoutes();

			routes.forEach((route) => {
				const path = prefix + route.path;
				this.app[route.method](path, (req: Request, res: Response) => controllerInstance[route.methodName](req, res));
			});
		});
	}
}

export default Express.getInstance().getApp();
