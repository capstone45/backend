import { AbstractRecipeRepository } from './recipeRepository';
import { AbstractUserRepository } from '../../user/type/userRepository';

import RecipeIngredient from '../../recipe-ingredient/recipe-ingredient.entity';
import Recipe from '../recipe.entity';

export abstract class AbstractRecipeService {
	private static instance: AbstractRecipeService;
	private static recipeRepository: AbstractRecipeRepository;
	private static userRepository: AbstractUserRepository;

	public static getInstance(dependency): AbstractRecipeService;
	private constructor(dependency);

	createRecipe(userId: number, body: Partial<Recipe>): Promise<void>;
	updateRecipe(userId: number, body: Partial<Recipe>): Promise<void>;
	findById(id: number): Promise<Partial<Recipe>>;
	findByTitle(title: string): Promise<Partial<Recipe>[]>;
	findByTodaysMostLiked(): Promise<Partial<Recipe>[]>;
	findByLatestCreated(): Promise<Partial<Recipe>[]>;
	findBySubscribingChefsLatest(id: number): Promise<Partial<Recipe>[]>;
	findByIngredient(ingredients: string[]): Promise<Partial<Recipe>[]>;
	private static getIncludeRate(ingredients: RecipeIngredient[], keywords: string[]): boolean;
}
