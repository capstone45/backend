import { EntityManager, getManager } from 'typeorm';

import { AbstractRecipeRepository, RecipeBody } from './recipe';
import Recipe from './recipe.entity';
import { getFormattedDate } from '../helper/helper';
import UserRepository from '../user/user.repository';

export default class RecipeRepository implements AbstractRecipeRepository {
	private static instance: AbstractRecipeRepository;
	private static em: EntityManager;
	private static SEARCH_LIMIT = 6;

	public static getInstance(em: EntityManager): AbstractRecipeRepository {
		if (!RecipeRepository.instance) {
			RecipeRepository.instance = new RecipeRepository(em);
		}
		return RecipeRepository.instance;
	}

	private constructor(em: EntityManager) {
		RecipeRepository.em = em;
	}

	async create(userId: number, body: RecipeBody): Promise<number> {
		const user = await UserRepository.getInstance(getManager()).findById(userId);
		const id = await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder()
			.insert()
			.into(Recipe)
			.values([
				{
					user: user,
					title: body.title,
					description: body.description,
					thumbnailUrl: body.thumbnailUrl,
					referenceUrl: body.referenceUrl,
					serving: body.serving,
					ingredients: body.ingredients,
					detailDescriptions: body.detailDescriptions,
				},
			])
			.execute();
		return Number(id.identifiers[0].id);
	}

	async findById(id: number): Promise<Partial<Recipe>> {
		const findResult = await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder('recipe')
			.select()
			.where('recipe.id=:id', { id })
			.getOne();
		return findResult;
	}

	async findByTitle(title: string): Promise<Partial<Recipe>[]> {
		const findRecipes = await RecipeRepository.em.getRepository(Recipe).find({ where: { title: title } });
		return findRecipes;
	}

	async findByTodaysMostLiked(): Promise<Partial<Recipe>[]> {
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

	async findByLatestCreated(): Promise<Partial<Recipe>[]> {
		const findRecipes = await RecipeRepository.em
			.getRepository(Recipe)
			.createQueryBuilder('recipe')
			.select()
			.orderBy('recipe.createDate', 'DESC')
			.limit(RecipeRepository.SEARCH_LIMIT)
			.getMany();
		return findRecipes;
	}

	async findBySubscribingChefsLatest(id: number): Promise<Partial<Recipe>[]> {
		const findRecipes = await RecipeRepository.em.query(`
			select * from recipe as r where (r.user_id, r.create_date) in (SELECT r.user_id, max(r.create_date) FROM (select PUBLISHER_ID from SUBSCRIBE where SUBSCRIBER_ID = ${id}) as p JOIN RECIPE as r ON p.PUBLISHER_ID = r.USER_ID group by r.user_id);`);
		return findRecipes;
	}

	async findAll(): Promise<Partial<Recipe>[]> {
		return await RecipeRepository.em.getRepository(Recipe).createQueryBuilder('recipe').select().getMany();
	}
}
