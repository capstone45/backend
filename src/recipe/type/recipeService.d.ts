import RecipeIngredient from '../../recipeIngredient/recipeIngredient.entity';
import Recipe from '../recipe.entity';

import { AbstractUserRepository } from '../../user/type/userRepository';
import { AbstractTagRepository } from '../../tag/type/tagRepository';
import { AbstractRecipeRepository } from './recipeRepository';
import { ModifyRecipeDTO, ReadRecipeDetailDTO } from './data';
import { AbstractBookmarkRepository } from '../../bookmark/type/bookmarkRepository';

export abstract class AbstractRecipeService {
	private static recipeRepository: AbstractRecipeRepository;
	private static recipeTagRepository: AbstractTagRepository;
	private static userRepository: AbstractUserRepository;
	private static tagRepository: AbstractTagRepository;
	private static bookmarkRepository: AbstractBookmarkRepository;
	private static instance: AbstractRecipeService;

	public static getInstance(dependency): AbstractRecipeService;
	private constructor(dependency);

	createRecipe(userId: number, body: ModifyRecipeDTO): Promise<void>;

	findBySubscribingChefsLatest(id: number): Promise<Recipe[]>;
	findByIngredient(ingredients: string[]): Promise<Recipe[]>;
	findByTitle(title: string): Promise<Recipe[]>;
	findByTodaysMostLiked(): Promise<Recipe[]>;
	findByLatestCreated(): Promise<Recipe[]>;
	findById(recipeId: number, userId: number): Promise<ReadRecipeDetailDTO>;

	updateRecipe(userId: number, recipeId: number, body: ModifyRecipeDTO): Promise<void>;

	private static getIncludeRate(ingredients: RecipeIngredient[], keywords: string[]): boolean;
}
