import express, { Request, Response, Router } from 'express';
class App {
	app: express.Application;
	constructor() {
		this.app = express();
	}
}

const app = new App().app;
app.get('/', (req: Request, res: Response) => {
	res.send('Hello');
});

app.listen(3000, () => {
	console.log('Started server with 3000');
});
