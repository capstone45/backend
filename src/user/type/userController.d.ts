import express, { Router, Request, Response } from 'express';

import { AbstractUserService } from './userService';

export abstract class AbstractUserController {
	private static instance: AbstractUserController;
	private static userService: AbstractUserService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(dependency): AbstractUserController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	updateById(req: Request, res: Response): Promise<void>;
	updateThumbnail(req: Request, res: Response): Promise<void>;
	deleteThumbnail(req: Request, res: Response): Promise<void>;
	getById(req: Request, res: Response): Promise<void>;
	getByNickname(req: Request, res: Response): Promise<void>;
}
