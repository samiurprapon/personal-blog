import { RequestHandler } from 'express';
import compressionLib from 'compression';

export default function compression(): RequestHandler {
	return compressionLib({
		level: -1,
		memLevel: 8,
	});
}
