import { EntityManager } from 'typeorm';

import { AbstractRecipeRepository } from './recipe';
import Recipe from './recipe.entity';
import { getFormattedDate } from '../helper/helper';

export default class RecipeRepository implements AbstractRecipeRepository {
	private static instance: AbstractRecipeRepository;
	private static em: EntityManager;
	private LIMIT: 6;

	public static getInstance(em: EntityManager): AbstractRecipeRepository {
		if (!RecipeRepository.instance) {
			RecipeRepository.instance = new RecipeRepository(em);
		}
		return RecipeRepository.instance;
	}

	private constructor(em: EntityManager) {
		RecipeRepository.em = em;
	}

	async findRecipeByTitle(title: string): Promise<Partial<Recipe>[]> {
		const findRecipeList = await RecipeRepository.em.getRepository(Recipe).find({ where: { title: title } });
		return findRecipeList;
	}

	async findTodaysMostLikedRecipe(): Promise<Partial<Recipe>[]> {
		const findRecipeList = await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder('recipe')
			.select()
			.leftJoin('recipe.bookmarks', 'bookmark')
			.where('recipe.createDate = :today', { today: getFormattedDate(new Date()) })
			.groupBy('recipe.id')
			.orderBy('COUNT(bookmark.id)', 'DESC')
			.limit(this.LIMIT)
			.getMany();
		return findRecipeList;
	}

	async findLatestCreatedRecipe(): Promise<Partial<Recipe>[]> {
		const findRecipeList = await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder('recipe')
			.select()
			.orderBy('recipe.createDate', 'DESC')
			.limit(this.LIMIT)
			.getMany();
		return findRecipeList;
	}
	async findSubscribingChefsLatestRecipe(id: number): Promise<Partial<Recipe>[]> {
		const findRecipeList = await RecipeRepository.em.query(`
			select * from recipe as r where (r.user_id, r.create_date) in (SELECT r.user_id, max(r.create_date) FROM (select PUBLISHER_ID from SUBSCRIBE where SUBSCRIBER_ID = ${id}) as p JOIN RECIPE as r ON p.PUBLISHER_ID = r.USER_ID group by r.user_id);`);
		return findRecipeList;
	}
}
