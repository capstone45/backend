import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

const ormconfig: ConnectionOptions[] = [
	{
		name: 'production',
		type: 'mysql',
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASENAME,
		synchronize: false,
		logging: true,
		entities: ['src/**/entity.ts'],
	},
	{
		name: 'test',
		type: 'mysql',
		host: process.env.DB_TEST_HOST,
		port: Number(process.env.DB_TEST_PORT),
		username: process.env.DB_TEST_USERNAME,
		password: process.env.DB_TEST_PASSWORD,
		database: process.env.DB_TEST_DATABASENAME,
		synchronize: true,
		logging: true,
		dropSchema: true,
		entities: ['src/**/entity.ts'],
	},
];

export default ormconfig;
