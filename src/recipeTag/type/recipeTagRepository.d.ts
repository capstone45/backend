import { EntityManager } from 'typeorm';

import RecipeTag from '../recipeTag.entity';

export class AbstractRecipeTagRepository {
	private static instance: AbstractRecipeTagRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractRecipeTagRepository;
	private constructor(dependency);

	findAll(): Promise<RecipeTag[]>;
}
