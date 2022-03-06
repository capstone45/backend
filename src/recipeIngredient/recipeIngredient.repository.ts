import { EntityManager } from 'typeorm';

import recipeIngredientEntity from './recipeIngredient.entity';
import RecipeIngredient from './recipeIngredient.entity';

import { AbstractRecipeIngredientRepository } from './type/recipeIngredientRepository';

export default class RecipeIngredientRepository implements AbstractRecipeIngredientRepository {
	private static instance: AbstractRecipeIngredientRepository;
	private static em: EntityManager;

	static getInstance(dependency): AbstractRecipeIngredientRepository {
		if (!RecipeIngredientRepository.instance) {
			RecipeIngredientRepository.instance = new RecipeIngredientRepository(dependency);
		}
		return RecipeIngredientRepository.instance;
	}

	private constructor(dependency) {
		RecipeIngredientRepository.em = dependency.em;
	}

	async findAll(): Promise<recipeIngredientEntity[]> {
		return await RecipeIngredientRepository.em.getRepository(RecipeIngredient).find();
	}
}
