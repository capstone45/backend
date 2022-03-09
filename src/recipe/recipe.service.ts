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
import { AbstractRecipeDescriptionRepository } from '../recipeDescription/type/recipeDescriptionRepository';
import { AbstractRecipeIngredientRepository } from '../recipeIngredient/type/recipeIngredientRepository';
import { AbstractRecipeTagRepository } from '../recipeTag/type/recipeTagRepository';

export default class RecipeService implements AbstractRecipeService {
	private static instance: AbstractRecipeService;

	private static ingredientRepository: AbstractIngredientRepository;
	private static recipeRepository: AbstractRecipeRepository;
	private static userRepository: AbstractUserRepository;
	private static tagRepository: AbstractTagRepository;
	private static bookmarkRepository: AbstractBookmarkRepository;
	private static recipeDescriptionRepository: AbstractRecipeDescriptionRepository;
	private static recipeIngredientRepository: AbstractRecipeIngredientRepository;
	private static recipeTagRepository: AbstractRecipeTagRepository;

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
		RecipeService.recipeDescriptionRepository = dependency.recipeDescriptionRepository;
		RecipeService.recipeIngredientRepository = dependency.recipeIngredientRepository;
		RecipeService.recipeTagRepository = dependency.recipeTagRepository;
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
		if (Number(user.id) !== userId) throw new Error('request user and recipe user is different');

		// 이전 recipe Description 삭제
		const oldRecipeDescriptions = await recipe.recipeDescriptions;
		await Promise.all(
			oldRecipeDescriptions.map(async (recipeDescription) => {
				return await RecipeService.recipeDescriptionRepository.delete(recipeDescription);
			})
		);

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

		// 이전 recipe Ingredient 제거
		const oldRecipeIngredient = await recipe.recipeIngredients;
		await Promise.all(
			oldRecipeIngredient.map(async (recipeIngredient) => {
				return await RecipeService.recipeIngredientRepository.delete(recipeIngredient);
			})
		);

		// Recipe Ingredient 만들기
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
		// 이전 recipe tag 제거
		const oldRecipeTags = await recipe.recipeTags;
		await Promise.all(
			oldRecipeTags.map(async (recipeTag) => {
				return await RecipeService.recipeTagRepository.delete(recipeTag);
			})
		);

		// RecipeTag 만들기
		const recipeTags = tags.map((tag) => RecipeTag.create(recipe, tag));

		// 연관관계 설정
		recipe.title = body.title;
		recipe.description = body.description;
		recipe.thumbnailUrl = body.thumbnailUrl;
		recipe.referenceUrl = body.referenceUrl;
		recipe.serving = body.serving;
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
