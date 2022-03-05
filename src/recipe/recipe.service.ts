import RecipeIngredient from '../recipe-ingredient/recipe-ingredient.entity';
import { AbstractUserRepository } from '../user/type/userRepository';

import { AbstractRecipeRepository } from './type/recipeRepository';
import { AbstractRecipeService } from './type/recipeService';

import Recipe from './recipe.entity';

export default class RecipeService implements AbstractRecipeService {
	private static instance: AbstractRecipeService;
	private static recipeRepository: AbstractRecipeRepository;
	private static userRepository: AbstractUserRepository;
	private static INCLUDE_THRESHOLD = 0.5;

	public static getInstance(dependency): AbstractRecipeService {
		if (!RecipeService.instance) {
			RecipeService.instance = new RecipeService(dependency);
		}
		return RecipeService.instance;
	}

	private constructor(dependency) {
		RecipeService.recipeRepository = dependency.recipeRepository;
		RecipeService.userRepository = dependency.userRepository;
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

	// Domain Model Pattern
	async createRecipe(userId: number, body: Partial<Recipe>): Promise<void> {
		const user = await RecipeService.userRepository.findById(userId);
		console.log(1);
		const recipe = await RecipeService.recipeRepository.create(user, body);
		// Promise.all(
		// 	tags.map(async (rawTag) => {
		// 		const tagId = await TagRepository.getInstance(getManager()).create(rawTag);
		// 		const tag = await TagRepository.getInstance(getManager()).findById(tagId);
		// 		await getManager()
		// 			.createQueryBuilder()
		// 			.insert()
		// 			.into(RecipeTag)
		// 			.values([{ recipe: recipe, tag: tag }])
		// 			.execute();
		// 	})
		// );
	}

	async updateRecipe(userId: number, body: Partial<Recipe>): Promise<void> {
		console.log();
	}

	// Transaction Script Pattern
	async findById(id: number): Promise<Partial<Recipe>> {
		const findRecipes = await RecipeService.recipeRepository.findById(id);
		return findRecipes;
	}

	async findByTitle(title: string): Promise<Partial<Recipe>[]> {
		const findRecipes = await RecipeService.recipeRepository.findByTitle(title);
		return findRecipes;
	}

	async findByTodaysMostLiked(): Promise<Partial<Recipe>[]> {
		const findRecipes = await RecipeService.recipeRepository.findByTodaysMostLiked();
		return findRecipes;
	}

	async findByLatestCreated(): Promise<Partial<Recipe>[]> {
		const findRecipes = await RecipeService.recipeRepository.findByLatestCreated();
		return findRecipes;
	}

	async findBySubscribingChefsLatest(id: number): Promise<Partial<Recipe>[]> {
		const findRecipes = await RecipeService.recipeRepository.findBySubscribingChefsLatest(id);
		return findRecipes;
	}

	async findByIngredient(keywords: string[]): Promise<Partial<Recipe>[]> {
		const allRecipes = await RecipeService.recipeRepository.findAll();

		return await Promise.all(
			allRecipes.map(async (recipe) => {
				const ingredients = await recipe.ingredients;
				if (RecipeService.getIncludeRate(ingredients, keywords)) return recipe;
			})
		);
	}
}
