/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { ROUTES_KEY } from '@/utils/constants';

export const Controller = (prefix = ''): ClassDecorator => {
	return (target: any) => {
		Reflect.defineMetadata('prefix', prefix, target);
	};
};

const createMethodDecorator = (method: string) => {
	return (path = ''): MethodDecorator => {
		return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
			const routes = Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];

			routes.push({
				method,
				path,
				methodName: propertyKey,
			});

			Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);

			// console.log(`[DEBUG] Registered route: ${method.toUpperCase()} ${path} -> ${String(propertyKey)}`);
			// console.log(`[DEBUG] Routes metadata:`, routes);

			return descriptor;
		};
	};
};

export const Method = {
	Get: createMethodDecorator('get'),
	Post: createMethodDecorator('post'),
	Put: createMethodDecorator('put'),
	Delete: createMethodDecorator('delete'),
	Patch: createMethodDecorator('patch'),
};
