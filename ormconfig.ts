import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

const ormconfig: ConnectionOptions = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASENAME,
	synchronize: true,
	logging: true,
	entities: ['src/**/*.entity.ts'],
};

export default ormconfig;
