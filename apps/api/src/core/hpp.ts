import hpp from 'hpp';

/**
 *
 * @description Express middleware to protect against HTTP Parameter Pollution attacks
 *
 */
import { RequestHandler } from 'express';

export default function devHpp(): RequestHandler {
	return hpp();
}
