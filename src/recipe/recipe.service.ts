import RecipeIngredient from '../recipe-ingredient/recipe-ingredient.entity';
import { AbstractRecipeRepository, AbstractRecipeService } from './recipe';

import Recipe from './recipe.entity';

export default class RecipeService implements AbstractRecipeService {
	private static instance: AbstractRecipeService;
	private static RecipeRepository: AbstractRecipeRepository;
	private static INCLUDE_THRESHOLD = 0.5;

	public static getInstance(RecipeRepository: AbstractRecipeRepository): AbstractRecipeService {
		if (!RecipeService.instance) {
			RecipeService.instance = new RecipeService(RecipeRepository);
		}
		return RecipeService.instance;
	}

	private constructor(RecipeRepository: AbstractRecipeRepository) {
		RecipeService.RecipeRepository = RecipeRepository;
	}

	private static getIncludeRate(ingredients: RecipeIngredient[], keywords: string[]): boolean {
		let count = 0;
		ingredients.forEach((ingredient) => {
			if (keywords.includes(ingredient.ingredient.name)) {
				count += 1;
			}
		});
		return count / ingredients.length >= RecipeService.INCLUDE_THRESHOLD ? true : false;
	}

	async findByTitle(title: string): Promise<Partial<Recipe>[]> {
		const findRecipes = await RecipeService.RecipeRepository.findByTitle(title);
		return findRecipes;
	}

	async findByTodaysMostLiked(): Promise<Partial<Recipe>[]> {
		const findRecipes = await RecipeService.RecipeRepository.findByTodaysMostLiked();
		return findRecipes;
	}

	async findByLatestCreated(): Promise<Partial<Recipe>[]> {
		const findRecipes = await RecipeService.RecipeRepository.findByLatestCreated();
		return findRecipes;
	}

	async findBySubscribingChefsLatest(id: number): Promise<Partial<Recipe>[]> {
		const findRecipes = await RecipeService.RecipeRepository.findBySubscribingChefsLatest(id);
		return findRecipes;
	}

	async findByIngredient(keywords: string[]): Promise<Partial<Recipe>[]> {
		const allRecipes = await RecipeService.RecipeRepository.findAll();

		return await Promise.all(
			allRecipes.map(async (recipe) => {
				const ingredients = await recipe.ingredients;
				if (RecipeService.getIncludeRate(ingredients, keywords)) return recipe;
			})
		);
	}
}
