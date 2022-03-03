import RecipeIngredient from '../recipe-ingredient/recipe-ingredient.entity';
import { AbstractUserRepository } from '../user/user';
import { AbstractRecipeRepository, AbstractRecipeService } from './recipe';

import { RecipeBody } from './recipe';
import Tag from '../tag/tag.entity';

import Recipe from './recipe.entity';

import TagRepository from '../tag/tag.repository';
import { getManager } from 'typeorm';
import RecipeTag from '../recipe-tag/recipe-tag.entity';

export default class RecipeService implements AbstractRecipeService {
	private static instance: AbstractRecipeService;
	private static recipeRepository: AbstractRecipeRepository;
	private static userRepository: AbstractUserRepository;
	private static INCLUDE_THRESHOLD = 0.5;

	public static getInstance(recipeRepository: AbstractRecipeRepository, userRepository: AbstractUserRepository): AbstractRecipeService {
		if (!RecipeService.instance) {
			RecipeService.instance = new RecipeService(recipeRepository, userRepository);
		}
		return RecipeService.instance;
	}

	private constructor(recipeRepository: AbstractRecipeRepository, userRepository: AbstractUserRepository) {
		RecipeService.recipeRepository = recipeRepository;
		RecipeService.userRepository = userRepository;
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
	async createRecipe(userId: number, body: RecipeBody, tags: Tag[]): Promise<void> {
		const recipeId = await RecipeService.recipeRepository.create(userId, body);

		const recipe = await RecipeService.recipeRepository.findById(recipeId);

		Promise.all(
			tags.map(async (rawTag) => {
				const tagId = await TagRepository.getInstance(getManager()).create(rawTag);
				const tag = await TagRepository.getInstance(getManager()).findById(tagId);
				console.log(tag);
				await getManager()
					.createQueryBuilder()
					.insert()
					.into(RecipeTag)
					.values([{ recipe: recipe, tag: tag }])
					.execute();
			})
		);
	}

	async updateRecipe(userId: number, body: RecipeBody): Promise<void> {
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
