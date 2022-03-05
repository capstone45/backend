import express, { Router, Request, Response } from 'express';

import { AbstractTagService } from './tagService';

export abstract class AbstractTagController {
	private static instance: AbstractTagController;
	private static tagService: AbstractTagService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(dependency): AbstractTagController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	getTagByName(req: Request, res: Response): Promise<void>;
}
