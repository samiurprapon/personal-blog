import { DataSource } from 'typeorm';

import config from '@/config/required';

export const AppDataSource = new DataSource({
	applicationName: 'personal-blog',
	type: 'postgres',
	database: config.APP_DB_NAME,
	host: config.APP_DB_HOST,
	port: config.APP_DB_PORT,
	username: config.APP_DB_USER,
	password: config.APP_DB_PASSWORD,
	schema: 'public',
	synchronize: false,
	logging: config.NODE_ENV === 'development',
	migrationsRun: config.NODE_ENV === 'production',
	migrations: ['src/providers/postgres/migrations/*.{ts,js}'],
	entities: ['**/*.entity.{ts,js}'],
	ssl: {
		rejectUnauthorized: true,
		ca: config.APP_DB_SSL,
	},
	poolSize: 20,
	maxQueryExecutionTime: 10 * 1000,
});
