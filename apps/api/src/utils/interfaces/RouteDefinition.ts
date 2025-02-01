import { RequestHandler } from 'express';
import { HTTP_METHODS } from '@/utils/constants';

export interface RouteDefinition {
	path: string;
	method: (typeof HTTP_METHODS)[number];
	methodName: string | symbol;
	handlers?: RequestHandler[];
}
