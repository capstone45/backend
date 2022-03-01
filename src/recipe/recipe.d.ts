import { EntityManager } from 'typeorm';
import express, { Request, Response, Router } from 'express';

import Recipe from './recipe.entity';

export abstract class AbstractRecipeRepository {
	private static instance: AbstractRecipeRepository;
	private static em: EntityManager;

	public static getInstance(em: EntityManager): AbstractRecipeRepository;
	private constructor(em: EntityManager);

	findRecipeByTitle(title: string): Promise<Partial<Recipe>[]>;
	findTodaysMostLikedRecipe(): Promise<Partial<Recipe>[]>;
	findLatestCreatedRecipe(): Promise<Partial<Recipe>[]>;
	findSubscribingChefsLatestRecipe(id: number): Promise<Partial<Recipe>[]>;
}

export abstract class AbstractRecipeService {
	private static instance: AbstractRecipeService;
	private static recipeRepository: AbstractRecipeRepository;

	public static getInstance(recipeRepository: AbstractRecipeRepository): AbstractRecipeService;
	private constructor(recipeRepository: AbstractRecipeRepository);

	findRecipeByTitle(title: string): Promise<Partial<Recipe>[]>;
	findTodaysMostLikedRecipe(): Promise<Partial<Recipe>[]>;
	findLatestCreatedRecipe(): Promise<Partial<Recipe>[]>;
	findSubscribingChefsLatestRecipe(id: number): Promise<Partial<Recipe>[]>;
}

export abstract class AbstractRecipeController {
	private static instance: AbstractRecipeController;
	private static recipeService: AbstractRecipeService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(recipeService: AbstractRecipeService, app: express.Application): AbstractRecipeController;
	private constructor(recipeService: AbstractRecipeService, app: express.Application);
	initRouter(app: express.Application): void;

	getRecipeByTitle(req: Request, res: Response): Promise<void>;
	getTodaysMostLikedRecipe(req: Request, res: Response): Promise<void>;
	getLatestCreatedRecipe(req: Request, res: Response): Promise<void>;
	getSubscribingChefsLatestRecipe(req: Request, res: Response): Promise<void>;
}
