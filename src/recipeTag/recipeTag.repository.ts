import { EntityManager } from 'typeorm';

import RecipeTag from './recipeTag.entity';

import { AbstractRecipeTagRepository } from './type/recipeTagRepository';

export default class RecipeTagRepository implements AbstractRecipeTagRepository {
	private static instance: AbstractRecipeTagRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractRecipeTagRepository {
		if (!RecipeTagRepository.instance) {
			RecipeTagRepository.instance = new RecipeTagRepository(dependency);
		}
		return RecipeTagRepository.instance;
	}

	private constructor(dependency) {
		RecipeTagRepository.em = dependency.em;
	}

	async findAll(): Promise<RecipeTag[]> {
		return await RecipeTagRepository.em.getRepository(RecipeTag).find();
	}

	async delete(recipeTag: RecipeTag): Promise<void> {
		await RecipeTagRepository.em.delete(RecipeTag, recipeTag);
	}
}
