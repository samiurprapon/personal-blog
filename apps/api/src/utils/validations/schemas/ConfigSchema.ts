import { z } from 'zod';

export const configSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	HOST: z.string().default('localhost'),
	PORT: z.coerce.number().default(3001),

	// Database
	APP_DB_NAME: z.string().default('diary'),
	APP_DB_PASSWORD: z.string().default(''),
	APP_DB_USER: z.string().default(''),
	APP_DB_HOST: z.string().default(''),
	APP_DB_PORT: z.coerce.number().default(5432),
	APP_DB_SSL: z.string().default(''),

	// Redis
	REDIS_URI: z.string().default('redis://localhost:6379'),

	// Security
	PASSWORD_SALT: z.coerce.number().default(10),
	ACCESS_TOKEN_EXPIRES: z.string().default('30m'),
});

export type Config = z.infer<typeof configSchema>;
