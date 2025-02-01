import path from 'path';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development'; // default to development [development, production, test]
const envFilePath = path.resolve(__dirname, `../../../.env.${env}.local`);

// Load the .env file
const result = dotenv.config({ path: envFilePath });

/*
 * DO NOT REMOVE THIS CODE
 * This error check is important for database migration related task
 *
 */
if (result.error) {
	dotenv.config({
		path: path.resolve(__dirname, `../../.env.${env}.local`),
	});
}

export const config = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	HOST: process.env.HOST || 'localhost',
	PORT: +(process.env.PORT || 3001),
	APP_DB_NAME: process.env.APP_DB_NAME || 'rzsian',
	APP_DB_PASSWORD: process.env.APP_DB_PASSWORD || 'rzsian',
	APP_DB_USER: process.env.APP_DB_USER || 'rzsian',
	APP_DB_HOST: process.env.APP_DB_HOST || 'localhost',
	APP_DB_PORT: +(process.env.APP_DB_PORT || 5432),

	// Security
	PASSWORD_SALT: +(process.env.PASSWORD_SALT || 10),
	ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES || '30m',
};

export default config;
