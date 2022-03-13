import express, { Router, Request, Response } from 'express';

import { AbstractRecipeService } from './service';

export abstract class AbstractRecipeController {
	private static instance: AbstractRecipeController;
	private static recipeService: AbstractRecipeService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(dependency): AbstractRecipeController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	createRecipe(req: Request, res: Response): Promise<void>;
	getById(req: Request, res: Response): Promise<void>;
	getByTitle(req: Request, res: Response): Promise<void>;
	getTodaysMostLiked(req: Request, res: Response): Promise<void>;
	getLatestCreated(req: Request, res: Response): Promise<void>;
	getSubscribingChefsLatest(req: Request, res: Response): Promise<void>;
	getByIngredient(req: Request, res: Response): Promise<void>;
}
