import { EntityManager } from 'typeorm';
import express, { Request, Response, Router } from 'express';

import Recipe, { serving } from './recipe.entity';
import RecipeIngredient from '../recipe-ingredient/recipe-ingredient.entity';
import DetailDescription from '../recipe-description/recipe-description.entity';
import { AbstractUserRepository } from '../user/user';
import Tag from '../tag/tag.entity';

export abstract class AbstractRecipeRepository {
	private static instance: AbstractRecipeRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractRecipeRepository;
	private constructor(dependency);

	create(userId: number, body: RecipeBody): Promise<number>;
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
	private static userRepository: AbstractUserRepository;

	public static getInstance(dependency): AbstractRecipeService;
	private constructor(dependency);

	createRecipe(userId: number, body: RecipeBody, tags: Tag[]): Promise<void>;
	updateRecipe(userId: number, body: RecipeBody): Promise<void>;
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

	public static getInstance(dependency): AbstractRecipeController;
	private constructor(dependency);
	initRouter(app: express.Application): void;

	createRecipe(req: Request, res: Response): Promise<void>;
	getById(req: Request, res: Response): Promise<void>;
	getByTitle(req: Request, res: Response): Promise<void>;
	getByTodaysMostLiked(req: Request, res: Response): Promise<void>;
	getByLatestCreated(req: Request, res: Response): Promise<void>;
	getBySubscribingChefsLatest(req: Request, res: Response): Promise<void>;
	getByIngredient(req: Request, res: Response): Promise<void>;
}

export interface RecipeBody {
	title: string;
	description: string;
	thumbnailUrl: string;
	referenceUrl: string;
	serving: serving;
	ingredients: RecipeIngredient[];
	detailDescriptions: DetailDescription[];
}
