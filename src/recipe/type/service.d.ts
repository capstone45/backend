import RecipeIngredient from '../../recipeIngredient/entity';
import Recipe from '../entity';

import { AbsUserRepository } from '../../user/type/repository';
import { AbsTagRepository } from '../../tag/type/repository';
import { AbsRecipeRepository } from './repository';
import { ModifyRecipeDTO, ReadRecipeDetailDTO } from './data';
import { AbsBookmarkRepository } from '../../bookmark/type/repository';

export abstract class AbsRecipeService {
	private static recipeRepository: AbsRecipeRepository;
	private static recipeTagRepository: AbsTagRepository;
	private static userRepository: AbsUserRepository;
	private static tagRepository: AbsTagRepository;
	private static bookmarkRepository: AbsBookmarkRepository;
	private static instance: AbsRecipeService;

	public static getInstance(dependency): AbsRecipeService;
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
