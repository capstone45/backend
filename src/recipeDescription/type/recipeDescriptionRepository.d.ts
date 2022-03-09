import { EntityManager } from 'typeorm';

import RecipeDescription from '../recipeDescription.entity';

export class AbstractRecipeDescriptionRepository {
	private static instance: AbstractRecipeDescriptionRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractRecipeDescriptionRepository;
	private constructor(dependency);

	delete(recipeDescription: RecipeDescription): Promise<void>;
}
