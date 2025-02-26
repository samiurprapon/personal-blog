import path from 'path';
import dotenv from 'dotenv';

import { Config, configSchema } from '@/utils/validations/schemas/ConfigSchema';

const env = process.env.NODE_ENV || 'development';
const envFilePath = path.resolve(__dirname, `../../../.env.${env}.local`);

const result = dotenv.config({ path: envFilePath });

if (result.error) {
	dotenv.config({
		path: path.resolve(__dirname, `../../.env.${env}.local`),
	});
}

export const config: Config = configSchema.parse({
	NODE_ENV: process.env.NODE_ENV,
	HOST: process.env.HOST,
	PORT: process.env.PORT,
	APP_DB_NAME: process.env.APP_DB_NAME,
	APP_DB_PASSWORD: process.env.APP_DB_PASSWORD,
	APP_DB_USER: process.env.APP_DB_USER,
	APP_DB_HOST: process.env.APP_DB_HOST,
	APP_DB_PORT: process.env.APP_DB_PORT,
	APP_DB_SSL: process.env.APP_DB_SSL,
	REDIS_URI: process.env.REDIS_URI,
	PASSWORD_SALT: process.env.PASSWORD_SALT,
	ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES,
});

export default config;
