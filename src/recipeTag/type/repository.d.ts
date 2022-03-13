import { EntityManager } from 'typeorm';

import RecipeTag from '../entity';

export class AbstractRecipeTagRepository {
	private static instance: AbstractRecipeTagRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractRecipeTagRepository;
	private constructor(dependency);

	findAll(): Promise<RecipeTag[]>;

	delete(recipeTag: RecipeTag): Promise<void>;
}
