import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';

import initUserController from './user';

export default class App {
	private readonly app: express.Application = express();

	constructor() {
		this.init();
	}

	public getApp(): express.Application {
		return this.app;
	}

	private init() {
		// this.initMiiddleware();
		this.initController();
		this.initDatabase();
		this.initApplication();
	}

	// private initMiiddleware(): void {}

	private initController(): void {
		initUserController();
	}

	private initDatabase(): void {
		createConnection()
			.then(() => {
				console.log('DB has connected successfully');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	private initApplication(): void {
		this.app.listen(3000, () => {
			console.log('Application started successfully');
		});
	}
}

new App();
