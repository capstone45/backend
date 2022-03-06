import { EntityManager } from 'typeorm';

import Recipe from '../recipe.entity';

import { CreateRecipeDto } from './data';

export abstract class AbstractRecipeRepository {
	private static instance: AbstractRecipeRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractRecipeRepository;
	private constructor(dependency);

	create(rawRecipe: CreateRecipeDto): Recipe;
	save(recipe: Recipe): Promise<void>;
	findBySubscribingChefsLatest(id: number): Promise<Recipe[]>;
	findByTitle(title: string): Promise<Recipe[]>;
	findByTodaysMostLiked(): Promise<Recipe[]>;
	findByLatestCreated(): Promise<Recipe[]>;
	findById(id: number): Promise<Recipe>;
	findAll(): Promise<Recipe[]>;
}
