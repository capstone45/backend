import express, { Request, Response } from 'express';

import { AbsBookmarkController } from './type/controller';
import { AbsBookmarkService } from './type/service';

export default class BookmarkController {
	private static instance: AbsBookmarkController;
	private static bookmarkService: AbsBookmarkService;
	private static readonly router = express.Router();
	private static readonly PATH = '/api/bookmarks';

	public static getInstance(dependency): AbsBookmarkController {
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

		BookmarkController.router.post('/', this.changeBookmark);

		app.use(BookmarkController.PATH, BookmarkController.router);
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
