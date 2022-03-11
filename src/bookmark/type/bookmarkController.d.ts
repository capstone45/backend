import express, { Router, Request, Response } from 'express';

import { AbstractBookmarkService } from './bookmarkService';

export abstract class AbstractBookmarkController {
	private static instance: AbstractBookmarkController;
	private static bookmarkService: AbstractBookmarkService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(dependency): AbstractBookmarkController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	findByUser(req: Request, res: Response): Promise<void>;
	findByRecipe(req: Request, res: Response): Promise<void>;
	checkBookmark(req: Request, res: Response): Promise<void>;
	changeBookmark(req: Request, res: Response): Promise<void>;
}
