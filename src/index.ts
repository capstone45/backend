import 'reflect-metadata';
import { createConnection } from 'typeorm';
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
		this.initDatabase().then(() => {
			Container.initContainer();
		});
		this.initApplication();
	}

	private initMiddleware(): void {
		Application.app.use(express.json());
	}

	private initDatabase(): Promise<void> {
		return new Promise((res) => {
			createConnection().then(() => {
				res();
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
