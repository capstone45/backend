import { Connection, EntitySchema } from 'typeorm';
import { Recipe, AbstractRecipeRepository } from './recipe';

export default class RecipeRepository implements AbstractRecipeRepository {
	private static instance: AbstractRecipeRepository;
	private static connection: Connection;
	private static entity: EntitySchema;

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

	async findTagById(id: number): Promise<Recipe> {
		const findResult = await RecipeRepository.connection.getRepository(RecipeRepository.entity).findOne(id);

		return findResult;
	}

	async findRecipeByTitle(title: string): Promise<Recipe[]> {
		const findResultList = await RecipeRepository.connection.getRepository(RecipeRepository.entity).find({ where: { title: title } });
		return findResultList;
	}
}
