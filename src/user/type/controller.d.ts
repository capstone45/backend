import express, { Router, Request, Response } from 'express';

import { AbstractUserService } from './service';

export abstract class AbstractUserController {
	private static instance: AbstractUserController;
	private static readonly router: Router;
	private static readonly PATH: string;

	private static userService: AbstractUserService;

	public static getInstance(dependency): AbstractUserController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	getById(req: Request, res: Response): Promise<void>;
	getByNickname(req: Request, res: Response): Promise<void>;

	updateUserInfomation(req: Request, res: Response): Promise<void>;
	updateThumbnail(req: Request, res: Response): Promise<void>;

	deleteThumbnail(req: Request, res: Response): Promise<void>;
}
