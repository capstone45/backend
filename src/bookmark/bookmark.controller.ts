import express, { Request, Response } from 'express';

import { AbstractBookmarkController } from './type/bookmarkController';
import { AbstractBookmarkService } from './type/bookmarkService';

export default class BookmarkController {
	private static instance: AbstractBookmarkController;
	private static bookmarkService: AbstractBookmarkService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/bookmark';

	public static getInstance(dependency): AbstractBookmarkController {
		if (!BookmarkController.instance) {
			BookmarkController.instance = new BookmarkController(dependency);
		}
		return BookmarkController.instance;
	}

	private constructor(dependency) {
		BookmarkController.bookmarkService = dependency.bookmarkService;

		this.initRouter(dependency.app);
	}

	initRouter(app: express.Application): void {
		if (BookmarkController.instance) return;

		BookmarkController.router.get('/user/:id', this.findByUser);
		BookmarkController.router.get('/recipe/:id', this.findByRecipe);
		BookmarkController.router.post('/check', this.checkBookmark);
		BookmarkController.router.post('/', this.changeBookmark);

		app.use(BookmarkController.PATH, BookmarkController.router);
	}

	async findByUser(req: Request, res: Response): Promise<void> {
		const userId = Number(req.query.user);
		const findBookmarks = await BookmarkController.bookmarkService.findByUser(userId);
		res.send(findBookmarks);
	}

	async findByRecipe(req: Request, res: Response): Promise<void> {
		const recipe = Number(req.query.recipe);
		const findBookmarks = await BookmarkController.bookmarkService.findByRecipe(recipe);
		res.send(findBookmarks);
	}

	async checkBookmark(req: Request, res: Response): Promise<void> {
		const { recipeId, userId } = req.body;
		const bookmark = BookmarkController.bookmarkService.checkBookmark(recipeId, userId);
		res.send(bookmark);
	}

	async changeBookmark(req: Request, res: Response): Promise<void> {
		try {
			const { recipeId, userId } = req.body;
			BookmarkController.bookmarkService.changeBookmark(recipeId, userId);
			res.status(200).send();
		} catch (error) {
			res.status(400).send();
		}
	}
}
