import { AbstractRecipeRepository, AbstractRecipeService } from './recipe';

import Recipe from './recipe.entity';

export default class RecipeService implements AbstractRecipeService {
	private static instance: AbstractRecipeService;
	private static RecipeRepository: AbstractRecipeRepository;

	public static getInstance(RecipeRepository: AbstractRecipeRepository): AbstractRecipeService {
		if (!RecipeService.instance) {
			RecipeService.instance = new RecipeService(RecipeRepository);
		}
		return RecipeService.instance;
	}

	private constructor(RecipeRepository: AbstractRecipeRepository) {
		RecipeService.RecipeRepository = RecipeRepository;
	}

	async findRecipeByTitle(title: string): Promise<Partial<Recipe>[]> {
		const findRecipeList = await RecipeService.RecipeRepository.findRecipeByTitle(title);
		return findRecipeList;
	}

	async findTodaysMostLikedRecipe(): Promise<Partial<Recipe>[]> {
		const findRecipeList = await RecipeService.RecipeRepository.findTodaysMostLikedRecipe();
		return findRecipeList;
	}

	async findLatestCreatedRecipe(): Promise<Partial<Recipe>[]> {
		const findRecipeList = await RecipeService.RecipeRepository.findLatestCreatedRecipe();
		return findRecipeList;
	}

	async findSubscribingChefsLatestRecipe(id: number): Promise<Partial<Recipe>[]> {
		const findRecipeList = await RecipeService.RecipeRepository.findSubscribingChefsLatestRecipe(id);
		return findRecipeList;
	}
}
