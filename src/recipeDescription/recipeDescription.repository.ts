import { EntityManager } from 'typeorm';
import RecipeDescription from './recipeDescription.entity';

import { AbstractRecipeDescriptionRepository } from './type/recipeDescriptionRepository';

export default class RecipeDescriptionRepository implements AbstractRecipeDescriptionRepository {
	private static instance: AbstractRecipeDescriptionRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractRecipeDescriptionRepository {
		if (!RecipeDescriptionRepository.instance) {
			RecipeDescriptionRepository.instance = new RecipeDescriptionRepository(dependency);
		}
		return RecipeDescriptionRepository.instance;
	}
	private constructor(dependency) {
		RecipeDescriptionRepository.em = dependency.em;
	}

	async delete(recipeDescription: RecipeDescription): Promise<void> {
		await RecipeDescriptionRepository.em.delete(RecipeDescription, recipeDescription);
	}
}
