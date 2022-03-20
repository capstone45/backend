import 'reflect-metadata';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';

import Container from './container';

export default class Application {
	private static readonly app: express.Application = express();
	private static initialized: Application;

	public static init(): void {
		if (Application.initialized) return;
		Application.initialized = new Application();
	}

	private constructor() {
		this.initMiddleware();
		this.initDatabase().then((connection) => {
			Container.initContainer(Application.app, connection);
		});
		this.initApplication();
	}

	private initMiddleware(): void {
		Application.app.use(express.json());
		Application.app.use(express.urlencoded({ extended: true }));
	}

	private initDatabase(): Promise<Connection> {
		return new Promise((res) => {
			getConnectionOptions(process.env.NODE_ENV).then((connecitonOption) => {
				createConnection({ ...connecitonOption }).then((connection) => {
					res(connection);
				});
			});
		});
	}

	private initApplication(): void {
		Application.app.listen(3000, () => {
			console.log('Application started successfully');
		});
	}
}

Application.init();
