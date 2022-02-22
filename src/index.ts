import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';

class App {
	app: express.Application;
	constructor() {
		this.app = express();
		createConnection()
			.then(() => {
				console.log('DB Connected');
			})
			.catch((error) => {
				console.log(error);
			});
		this.app.listen(3000, () => {
			console.log('Started server with 3000');
		});
	}
}

const app = new App().app;
