import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import express from 'express';

import initUserController from './user';
import initTagController from './tag';
import initRecipeController from './recipe';

export default class Application {
	private static readonly app: express.Application = express();
	private static initialized: Application;

	public static init(): void {
		if (Application.initialized) return;
		Application.initialized = new Application();
	}

	private constructor() {
		this.initDatabase().then((connection) => {
			this.initController(connection);
		});
		this.initApplication();
	}

	private initDatabase(): Promise<Connection> {
		return new Promise((res) => {
			createConnection().then((connection) => {
				res(connection);
			});
		});
	}

	private initController(connection: Connection): void {
		initUserController(Application.app, connection);
		initTagController(Application.app, connection);
		initRecipeController(Application.app, connection);
	}

	private initApplication(): void {
		Application.app.listen(3000, () => {
			console.log('Application started successfully');
		});
	}
}

Application.init();
