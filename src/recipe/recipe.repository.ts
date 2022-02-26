import { Connection, EntitySchema } from 'typeorm';
import { getFormattedDate } from '../helper/helper';
import { Recipe, AbstractRecipeRepository } from './recipe';

export default class RecipeRepository implements AbstractRecipeRepository {
	private static instance: AbstractRecipeRepository;
	private static connection: Connection;
	private static entity: EntitySchema;
	private LIMIT: 6;

	public static getInstance(connection: Connection, entity: EntitySchema): AbstractRecipeRepository {
		if (!RecipeRepository.instance) {
			RecipeRepository.instance = new RecipeRepository(connection, entity);
		}
		return RecipeRepository.instance;
	}

	private constructor(connection: Connection, entity: EntitySchema) {
		RecipeRepository.connection = connection;
		RecipeRepository.entity = entity;
	}

	async findRecipeByTitle(title: string): Promise<Recipe[]> {
		const findRecipeList = await RecipeRepository.connection.getRepository(RecipeRepository.entity).find({ where: { title: title } });
		return findRecipeList;
	}

	async findTodaysMostLikedRecipe(): Promise<Recipe[]> {
		const findRecipeList = await RecipeRepository.connection
			.getRepository(RecipeRepository.entity)
			.createQueryBuilder('recipe')
			.select()
			.leftJoin('recipe.recipeHasTags', 'rht')
			.where('recipe.createDate = :today', { today: getFormattedDate(new Date()) })
			.groupBy('recipe.id')
			.orderBy('COUNT(rht.id)', 'DESC')
			.limit(this.LIMIT)
			.getMany();
		return findRecipeList;
	}

	async findLatestCreatedRecipe(): Promise<Recipe[]> {
		const findRecipeList = await RecipeRepository.connection
			.getRepository(RecipeRepository.entity)
			.createQueryBuilder('recipe')
			.select()
			.orderBy('recipe.createDate', 'DESC')
			.limit(this.LIMIT)
			.getMany();
		return findRecipeList;
	}
}
