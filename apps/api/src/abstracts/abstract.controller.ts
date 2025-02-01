import 'reflect-metadata';
import { RouteDefinition } from '@/utils/interfaces/RouteDefinition';
import { ROUTES_KEY } from '@/utils/constants';
import { IController } from '@/utils/interfaces/IController';

export abstract class AbstractController implements IController {
	public getRoutes(): RouteDefinition[] {
		return Reflect.getMetadata(ROUTES_KEY, this.constructor) || [];
	}
}
