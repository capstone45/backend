import { AbstractIngredientRepository } from '../ingredient/type/ingredientRepository';
import { AbstractUserRepository } from '../user/type/userRepository';
import { AbstractRecipeRepository } from './type/recipeRepository';
import { AbstractTagRepository } from '../tag/type/tagRepository';
import { AbstractRecipeService } from './type/recipeService';

import RecipeDescription from '../recipeDescription/recipeDescription.entity';
import RecipeIngredient from '../recipeIngredient/recipeIngredient.entity';
import Ingredient from '../ingredient/ingredient.entity';
import RecipeTag from '../recipeTag/recipeTag.entity';
import Recipe from './recipe.entity';
import Tag from '../tag/tag.entity';

import { CreateRecipeDto } from './type/data';

export default class RecipeService implements AbstractRecipeService {
	private static instance: AbstractRecipeService;

	private static ingredientRepository: AbstractIngredientRepository;
	private static recipeRepository: AbstractRecipeRepository;
	private static userRepository: AbstractUserRepository;
	private static tagRepository: AbstractTagRepository;

	private static INCLUDE_THRESHOLD = 0.5;

	public static getInstance(dependency): AbstractRecipeService {
		if (!RecipeService.instance) {
			RecipeService.instance = new RecipeService(dependency);
		}
		return RecipeService.instance;
	}

	private constructor(dependency) {
		RecipeService.ingredientRepository = dependency.ingredientRepository;
		RecipeService.recipeRepository = dependency.recipeRepository;
		RecipeService.userRepository = dependency.userRepository;
		RecipeService.tagRepository = dependency.tagRepository;
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

	async createRecipe(userId: number, body: CreateRecipeDto): Promise<void> {
		// user 찾기
		const user = await RecipeService.userRepository.findById(userId);

		// 미완성 recipe Object 만들기
		const recipe = Recipe.create(body, user);
		// recipeDescription 만들기
		const recipeDescriptions = body.recipeDescriptions.map((rawRecipeDescription) => {
			return RecipeDescription.create(recipe, rawRecipeDescription);
		});
		// ingredient 찾기 & 없으면 만들기
		const ingredients = await Promise.all(
			body.ingredients.map(async (rawIngredient) => {
				const ingredient = await RecipeService.ingredientRepository.findByName(rawIngredient.name);
				if (ingredient) {
					return ingredient;
				} else {
					return Ingredient.create(rawIngredient);
				}
			})
		);
		// RecipeIngredient 만들기
		const recipeIngredients = ingredients.map((ingredient, index) => {
			return RecipeIngredient.create(recipe, ingredient, body.ingredients[index].amount);
		});

		// tag 찾기 & 없으면 만들기
		const tags = await Promise.all(
			body.tags.map(async (tagName) => {
				const tag = await RecipeService.tagRepository.findTagByName(tagName);
				if (tag) return tag;
				else return Tag.create(tagName);
			})
		);

		// RecipeTag 만들기
		const recipeTags = tags.map((tag) => {
			return RecipeTag.create(recipe, tag);
		});

		// 연관관계 설정
		recipe.recipeDescriptions = recipeDescriptions;
		recipe.recipeIngredients = recipeIngredients;
		recipe.recipeTags = recipeTags;
		// Recipe 저장
		await RecipeService.recipeRepository.save(recipe);
	}

	async updateRecipe(userId: number, body: Recipe): Promise<void> {
		console.log();
	}

	// Transaction Script Pattern
	async findById(id: number): Promise<Recipe> {
		const findRecipes = await RecipeService.recipeRepository.findById(id);
		return findRecipes;
	}

	async findByTitle(title: string): Promise<Recipe[]> {
		const findRecipes = await RecipeService.recipeRepository.findByTitle(title);
		return findRecipes;
	}

	async findByTodaysMostLiked(): Promise<Recipe[]> {
		const findRecipes = await RecipeService.recipeRepository.findByTodaysMostLiked();
		return findRecipes;
	}

	async findByLatestCreated(): Promise<Recipe[]> {
		const findRecipes = await RecipeService.recipeRepository.findByLatestCreated();
		return findRecipes;
	}

	async findBySubscribingChefsLatest(id: number): Promise<Recipe[]> {
		const findRecipes = await RecipeService.recipeRepository.findBySubscribingChefsLatest(id);
		return findRecipes;
	}

	async findByIngredient(keywords: string[]): Promise<Recipe[]> {
		const allRecipes = await RecipeService.recipeRepository.findAll();

		return await Promise.all(
			allRecipes.map(async (recipe) => {
				const ingredients = await recipe.recipeIngredients;
				if (RecipeService.getIncludeRate(ingredients, keywords)) return recipe;
			})
		);
	}
}
