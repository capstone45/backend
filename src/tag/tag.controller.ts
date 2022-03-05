import express, { Request, Response } from 'express';

import { AbstractTagController } from './type/tagController';
import { AbstractTagService } from './type/tagService';

export default class TagController implements AbstractTagController {
	private static instance: AbstractTagController;
	private static tagService: AbstractTagService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/tags';

	public static getInstance(dependency): AbstractTagController {
		if (!TagController.instance) {
			TagController.instance = new TagController(dependency);
		}
		return TagController.instance;
	}

	private constructor(dependency) {
		TagController.tagService = dependency.tagService;
		this.initRouter(dependency.app);
	}

	initRouter(app: express.Application): void {
		if (TagController.instance) return;

		TagController.router.get('/search', this.getTagByName);

		app.use(TagController.PATH, TagController.router);
	}

	async getTagByName(req: Request, res: Response): Promise<void> {
		const name = String(req.query.name);
		const findTag = await TagController.tagService.findTagByName(name);
		res.send(findTag);
	}
}
