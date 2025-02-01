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
			return descriptor;
		};
	};
};

export const Get = createMethodDecorator('get');
export const Post = createMethodDecorator('post');
export const Put = createMethodDecorator('put');
export const Delete = createMethodDecorator('delete');
export const Patch = createMethodDecorator('patch');
