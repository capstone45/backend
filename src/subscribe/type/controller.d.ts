import express, { Router, Request, Response } from 'express';

import { AbstractSubscribeService } from './service';

export abstract class AbstractSubscribeController {
	private static instance: AbstractSubscribeController;
	private static subscribeService: AbstractSubscribeService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(dependency): AbstractSubscribeController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	changeSubscribe(req: Request, res: Response): Promise<void>;
}
