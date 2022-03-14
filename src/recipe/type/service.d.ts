import RecipeIngredient from '../../recipeIngredient/entity';
import Recipe from '../entity';

import { AbsBookmarkRepository } from '../../bookmark/type/repository';
import { AbsUserRepository } from '../../user/type/repository';
import { AbsTagRepository } from '../../tag/type/repository';
import { AbsRecipeRepository } from './repository';

import { BaseRecipeDTO, ModifyRecipeDTO, ReadRecipeDetailDTO } from './dto';

export abstract class AbsRecipeService {
	private static recipeRepository: AbsRecipeRepository;
	private static recipeTagRepository: AbsTagRepository;
	private static userRepository: AbsUserRepository;
	private static tagRepository: AbsTagRepository;
	private static bookmarkRepository: AbsBookmarkRepository;
	private static instance: AbsRecipeService;

	public static getInstance(dependency): AbsRecipeService;
	private constructor(dependency);

	deleteRecipe(userId: number, recipeId: number): Promise<void | Error>;
	createRecipe(userId: number, body: ModifyRecipeDTO): Promise<void>;
	findSubscribingChefsLatest(id: number): Promise<Recipe[]>;
	findByIngredient(ingredients: string[]): Promise<Recipe[]>;
	findByTitle(title: string): Promise<Recipe[]>;
	findTodaysMostLiked(): Promise<BaseRecipeDTO[]>;
	findLatestCreated(): Promise<BaseRecipeDTO[]>;
	findById(recipeId: number, userId: number): Promise<ReadRecipeDetailDTO>;

	updateRecipe(userId: number, recipeId: number, body: ModifyRecipeDTO): Promise<void>;

	private static getIncludeRate(ingredients: RecipeIngredient[], keywords: string[]): boolean;
}
