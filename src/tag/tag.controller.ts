import express, { Request, Response } from 'express';
import { AbstractTagController, AbstractTagService } from './tag';

export default class TagController implements AbstractTagController {
	private static instance: AbstractTagController;
	private static tagService: AbstractTagService;
	private static readonly router = express.Router();
	private static readonly PATH = '/tags';

	public static getInstance(tagService: AbstractTagService, app: express.Application): AbstractTagController {
		if (!TagController.instance) {
			TagController.instance = new TagController(tagService, app);
		}
		return TagController.instance;
	}

	private constructor(tagService: AbstractTagService, app: express.Application) {
		TagController.tagService = tagService;
		this.initRouter(app);
	}

	initRouter(app: express.Application): void {
		if (TagController.instance) return;
		TagController.router.get('', this.getTagByName);
		app.use(TagController.PATH, TagController.router);
	}

	async getTagByName(req: Request, res: Response): Promise<void> {
		const name = String(req.query.name);
		const findTag = await TagController.tagService.findTagByName(name);
		res.send(findTag);
	}
}
