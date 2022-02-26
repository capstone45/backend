import { Connection, EntitySchema } from 'typeorm';
import express, { Request, Response, Router } from 'express';

export abstract class AbstractRecipeRepository {
	private static instance: AbstractRecipeRepository;
	private static connection: Connection;
	private static entity: EntitySchema;

	public static getInstance(connection: Connection, entity: EntitySchema): AbstractRecipeRepository;
	private constructor(connection: Connection, entity: EntitySchema);

	findRecipeByTitle(title: string): Promise<Recipe[]>;
	findTodaysMostLikedRecipe(): Promise<Recipe[]>;
	findLatestCreatedRecipe(): Promise<Recipe[]>;
}

export abstract class AbstractRecipeService {
	private static instance: AbstractRecipeService;
	private static recipeRepository: AbstractRecipeRepository;

	public static getInstance(recipeRepository: AbstractRecipeRepository): AbstractRecipeService;
	private constructor(recipeRepository: AbstractRecipeRepository);

	findRecipeByTitle(title: string): Promise<Recipe[]>;
	findTodaysMostLikedRecipe(): Promise<Recipe[]>;
	findLatestCreatedRecipe(): Promise<Recipe[]>;
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
}

export type Recipe = {
	id: number;
	chefId: number;
	title: string;
	createdDate: Date;
	modifiedDate: Date;
	referenceUrl: string;
	serving: string;
};
