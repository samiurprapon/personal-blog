import 'reflect-metadata';

import { Server } from 'http';

import config from '@/config/required';
import app from '@/core/express';
import Redis from '@/providers/redis/Redis';

import { AppDataSource } from '@/providers/postgres/DataSource';

const server: Server = new Server(app);

Redis.ping();

AppDataSource.initialize()
	.then(() => {
		console.info('[ ready ] postgres connected!');
	})
	.catch((error) => {
		console.error('[ error ] postgres connection failed!');
		console.error(error);
	});

server.listen(config.PORT, config.HOST, () => {
	console.log(`[ ready ] http://${config.HOST}:${config.PORT}`);
});
