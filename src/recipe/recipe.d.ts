import { EntityManager } from 'typeorm';
import express, { Request, Response, Router } from 'express';

import Recipe from './recipe.entity';
import RecipeIngredient from '../recipe-ingredient/recipe-ingredient.entity';

export abstract class AbstractRecipeRepository {
	private static instance: AbstractRecipeRepository;
	private static em: EntityManager;

	public static getInstance(em: EntityManager): AbstractRecipeRepository;
	private constructor(em: EntityManager);

	findById(id: number): Promise<Partial<Recipe>>;
	findByTitle(title: string): Promise<Partial<Recipe>[]>;
	findByTodaysMostLiked(): Promise<Partial<Recipe>[]>;
	findByLatestCreated(): Promise<Partial<Recipe>[]>;
	findBySubscribingChefsLatest(id: number): Promise<Partial<Recipe>[]>;
	findAll(): Promise<Partial<Recipe>[]>;
}

export abstract class AbstractRecipeService {
	private static instance: AbstractRecipeService;
	private static recipeRepository: AbstractRecipeRepository;

	public static getInstance(recipeRepository: AbstractRecipeRepository): AbstractRecipeService;
	private constructor(recipeRepository: AbstractRecipeRepository);

	findById(id: number): Promise<Partial<Recipe>>;
	findByTitle(title: string): Promise<Partial<Recipe>[]>;
	findByTodaysMostLiked(): Promise<Partial<Recipe>[]>;
	findByLatestCreated(): Promise<Partial<Recipe>[]>;
	findBySubscribingChefsLatest(id: number): Promise<Partial<Recipe>[]>;
	findByIngredient(ingredients: string[]): Promise<Partial<Recipe>[]>;
	private static getIncludeRate(ingredients: RecipeIngredient[], keywords: string[]): boolean;
}

export abstract class AbstractRecipeController {
	private static instance: AbstractRecipeController;
	private static recipeService: AbstractRecipeService;
	private static readonly router: Router;
	private static readonly PATH: string;

	public static getInstance(recipeService: AbstractRecipeService, app: express.Application): AbstractRecipeController;
	private constructor(recipeService: AbstractRecipeService, app: express.Application);
	initRouter(app: express.Application): void;

	getById(req: Request, res: Response): Promise<void>;
	getByTitle(req: Request, res: Response): Promise<void>;
	getByTodaysMostLiked(req: Request, res: Response): Promise<void>;
	getByLatestCreated(req: Request, res: Response): Promise<void>;
	getBySubscribingChefsLatest(req: Request, res: Response): Promise<void>;
	getByIngredient(req: Request, res: Response): Promise<void>;
}
