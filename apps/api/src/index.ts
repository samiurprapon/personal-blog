import 'reflect-metadata';

import { Server } from 'http';

import config from '@/config/required';
import app from '@/core/express';

import { AppDataSource } from '@/providers/postgres/DataSource';

const server: Server = new Server(app);

AppDataSource.initialize()
	.then(() => {
		console.info('Database connected!');
	})
	.catch((error) => {
		console.error(error);
	});

server.listen(config.PORT, config.HOST, () => {
	console.log(`[ ready ] http://${config.HOST}:${config.PORT}`);
});
