import { RouteDefinition } from './RouteDefinition';

export interface IController {
	getRoutes(): RouteDefinition[];
}
