import RecipeIngredient from '../../recipeIngredient/recipeIngredient.entity';
import Recipe from '../recipe.entity';

import { AbstractUserRepository } from '../../user/type/userRepository';
import { AbstractTagRepository } from '../../tag/type/tagRepository';
import { AbstractRecipeRepository } from './recipeRepository';
import { CreateRecipe } from './data';

export abstract class AbstractRecipeService {
	private static recipeRepository: AbstractRecipeRepository;
	private static recipeTagRepository: AbstractTagRepository;
	private static userRepository: AbstractUserRepository;
	private static tagRepository: AbstractTagRepository;
	private static instance: AbstractRecipeService;

	public static getInstance(dependency): AbstractRecipeService;
	private constructor(dependency);

	createRecipe(userId: number, body: CreateRecipe): Promise<void>;

	findBySubscribingChefsLatest(id: number): Promise<Recipe[]>;
	findByIngredient(ingredients: string[]): Promise<Recipe[]>;
	findByTitle(title: string): Promise<Recipe[]>;
	findByTodaysMostLiked(): Promise<Recipe[]>;
	findByLatestCreated(): Promise<Recipe[]>;
	findById(id: number): Promise<Recipe>;

	updateRecipe(userId: number, body: Recipe): Promise<void>;

	private static getIncludeRate(ingredients: RecipeIngredient[], keywords: string[]): boolean;
}
