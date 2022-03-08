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

import { ModifyRecipeDTO, ReadRecipeDetailDTO } from './type/data';
import { AbstractBookmarkRepository } from '../bookmark/type/bookmarkRepository';

export default class RecipeService implements AbstractRecipeService {
	private static instance: AbstractRecipeService;

	private static ingredientRepository: AbstractIngredientRepository;
	private static recipeRepository: AbstractRecipeRepository;
	private static userRepository: AbstractUserRepository;
	private static tagRepository: AbstractTagRepository;
	private static bookmarkRepository: AbstractBookmarkRepository;

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
		RecipeService.bookmarkRepository = dependency.bookmarkRepository;
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

	async createRecipe(userId: number, body: ModifyRecipeDTO): Promise<void> {
		// user 찾기
		const user = await RecipeService.userRepository.findById(userId);

		// 미완성 recipe Object 만들기
		const recipe = Recipe.create(body, user);

		// recipeDescription 만들기
		const recipeDescriptions = body.recipeDescriptions.map((rawRecipeDescription) =>
			RecipeDescription.create(recipe, rawRecipeDescription)
		);

		// ingredient 찾기 & 없으면 만들기
		const ingredients = await Promise.all(
			body.ingredients.map(async (rawIngredient) => {
				const ingredient = (await RecipeService.ingredientRepository.findByName(rawIngredient.name))[0];
				return ingredient ? ingredient : Ingredient.create(rawIngredient);
			})
		);

		// RecipeIngredient 만들기
		const recipeIngredients = ingredients.map((ingredient, index) =>
			RecipeIngredient.create(recipe, ingredient, body.ingredients[index].amount)
		);

		// tag 찾기 & 없으면 만들기
		const tags = await Promise.all(
			body.tags.map(async (tagName) => {
				const tag = await RecipeService.tagRepository.findTagByName(tagName);
				return tag ? tag : Tag.create(tagName);
			})
		);

		// RecipeTag 만들기
		const recipeTags = tags.map((tag) => RecipeTag.create(recipe, tag));

		// 연관관계 설정
		recipe.recipeDescriptions = recipeDescriptions;
		recipe.recipeIngredients = recipeIngredients;
		recipe.recipeTags = recipeTags;

		// Recipe 저장
		await RecipeService.recipeRepository.save(recipe);
	}

	async updateRecipe(userId: number, recipeId: number, body: ModifyRecipeDTO): Promise<void> {
		const recipe = await RecipeService.recipeRepository.findById(recipeId);
		const user = await recipe.user;

		if (user.id !== userId) throw new Error('request user and recipe user is different');

		recipe.title = body.title;
		recipe.description = body.description;
		recipe.thumbnailUrl = body.thumbnailUrl;
		recipe.referenceUrl = body.referenceUrl;
		recipe.serving = body.serving;

		// 기존 설명 제거
		// recipeDescription 만들기
		const recipeDescriptions = body.recipeDescriptions.map((rawRecipeDescription) =>
			RecipeDescription.create(recipe, rawRecipeDescription)
		);

		// ingredient 찾기 & 없으면 만들기
		const ingredients = await Promise.all(
			body.ingredients.map(async (rawIngredient) => {
				const ingredient = (await RecipeService.ingredientRepository.findByName(rawIngredient.name))[0];
				return ingredient ? ingredient : Ingredient.create(rawIngredient);
			})
		);

		// 기존 데이터 제거
		// RecipeIngredient 만들기
		const recipeIngredients = ingredients.map((ingredient, index) =>
			RecipeIngredient.create(recipe, ingredient, body.ingredients[index].amount)
		);

		// tag 찾기 & 없으면 만들기
		const tags = await Promise.all(
			body.tags.map(async (tagName) => {
				const tag = await RecipeService.tagRepository.findTagByName(tagName);
				return tag ? tag : Tag.create(tagName);
			})
		);

		// 기존 데이터 제거
		// RecipeTag 만들기
		const recipeTags = tags.map((tag) => RecipeTag.create(recipe, tag));

		// 연관관계 설정
		recipe.recipeDescriptions = recipeDescriptions;
		recipe.recipeIngredients = recipeIngredients;
		recipe.recipeTags = recipeTags;

		await RecipeService.recipeRepository.save(recipe);
	}

	// Transaction Script Pattern
	async findById(recipeId: number, userId: number): Promise<ReadRecipeDetailDTO> {
		const recipe = await RecipeService.recipeRepository.findById(recipeId);
		const user = await recipe.user;
		const tags = (await recipe.recipeTags).map((recipeTag) => recipeTag.tag);
		const recipeIngredient = await recipe.recipeIngredients;
		const recipeDescription = await recipe.recipeDescriptions;
		const bookmark = userId === -1 ? false : await RecipeService.bookmarkRepository.checkBookmark(recipeId, userId);
		return new ReadRecipeDetailDTO(recipe, tags, user, recipeIngredient, recipeDescription, bookmark);
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
			allRecipes.filter(async (recipe) => {
				const ingredients = await recipe.recipeIngredients;
				if (RecipeService.getIncludeRate(ingredients, keywords)) return recipe;
			})
		);
	}
}
