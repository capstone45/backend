import 'reflect-metadata';
import { Connection, createConnection, EntityManager } from 'typeorm';
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
		this.initDatabase().then((connection: Connection) => {
			this.initController(connection.manager);
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

	private initController(manager: EntityManager): void {
		initUserController(Application.app, manager);
		initTagController(Application.app, manager);
		initRecipeController(Application.app, manager);
	}

	private initApplication(): void {
		Application.app.listen(3000, () => {
			console.log('Application started successfully');
		});
	}
}

Application.init();
