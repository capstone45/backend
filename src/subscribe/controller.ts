import express, { Request, Response } from 'express';

import { AbstractSubscribeController } from './type/controller';
import { AbstractSubscribeService } from './type/service';

export default class SubscribeController {
	private static instance: AbstractSubscribeController;
	private static subscribeService: AbstractSubscribeService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/subscribe';

	public static getInstance(dependency): AbstractSubscribeController {
		if (!SubscribeController.instance) {
			SubscribeController.instance = new SubscribeController(dependency);
		}
		return SubscribeController.instance;
	}

	private constructor(dependency) {
		SubscribeController.subscribeService = dependency.subscribeService;

		this.initRouter(dependency.app);
	}

	initRouter(app: express.Application): void {
		if (SubscribeController.instance) return;

		SubscribeController.router.post('/', this.changeSubscribe);

		app.use(SubscribeController.PATH, SubscribeController.router);
	}

	async changeSubscribe(req: Request, res: Response): Promise<void> {
		try {
			const { userId, starId } = req.body;
			SubscribeController.subscribeService.changeSubscribe(userId, starId);
			res.status(200).send();
		} catch (error) {
			res.status(400).send();
		}
	}
}
