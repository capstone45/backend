import { EntityManager } from 'typeorm';

import Recipe from './recipe.entity';

import { CreateRecipe } from './type/data';
import { AbstractRecipeRepository } from './type/recipeRepository';

import { getFormattedDate } from '../helper/helper';

export default class RecipeRepository implements AbstractRecipeRepository {
	private static instance: AbstractRecipeRepository;
	private static em: EntityManager;
	private static SEARCH_LIMIT = 6;

	public static getInstance(dependency): AbstractRecipeRepository {
		if (!RecipeRepository.instance) {
			RecipeRepository.instance = new RecipeRepository(dependency);
		}
		return RecipeRepository.instance;
	}

	private constructor(dependency) {
		RecipeRepository.em = dependency.em;
	}

	create(rawRecipe: CreateRecipe): Recipe {
		return RecipeRepository.em.create(Recipe, { title: rawRecipe.title });
	}

	async save(recipe: Recipe): Promise<void> {
		await RecipeRepository.em.save(recipe);
	}

	async findById(id: number): Promise<Recipe> {
		const findResult = await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder('recipe')
			.select()
			.where('recipe.id=:id', { id })
			.getOne();
		return findResult;
	}

	async findByTitle(title: string): Promise<Recipe[]> {
		const findRecipes = await RecipeRepository.em.getRepository(Recipe).find({ where: { title: title } });
		return findRecipes;
	}

	async findByTodaysMostLiked(): Promise<Recipe[]> {
		const findRecipes = await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder('recipe')
			.select()
			.leftJoin('recipe.bookmarks', 'bookmark')
			.where('recipe.createDate = :today', { today: getFormattedDate(new Date()) })
			.groupBy('recipe.id')
			.orderBy('COUNT(bookmark.id)', 'DESC')
			.limit(RecipeRepository.SEARCH_LIMIT)
			.getMany();
		return findRecipes;
	}

	async findByLatestCreated(): Promise<Recipe[]> {
		const findRecipes = await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder('recipe')
			.select()
			.orderBy('recipe.createDate', 'DESC')
			.limit(RecipeRepository.SEARCH_LIMIT)
			.getMany();
		return findRecipes;
	}

	async findBySubscribingChefsLatest(id: number): Promise<Recipe[]> {
		const findRecipes = await RecipeRepository.em.query(`
			select * from recipe as r where (r.user_id, r.create_date) in (SELECT r.user_id, max(r.create_date) FROM (select PUBLISHER_ID from SUBSCRIBE where SUBSCRIBER_ID = ${id}) as p JOIN RECIPE as r ON p.PUBLISHER_ID = r.USER_ID group by r.user_id);`);
		return findRecipes;
	}

	async findAll(): Promise<Recipe[]> {
		return await RecipeRepository.em.getRepository(Recipe).createQueryBuilder('recipe').select().getMany();
	}
}
