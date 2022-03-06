import { EntityManager } from 'typeorm';

import Ingredient from '../ingredient.entity';

import { AbstractIngredientRepository } from './ingredientRepository';

export default class IngredientRepository implements AbstractIngredientRepository {
	private static instance: AbstractIngredientRepository;
	private static em: EntityManager;

	public static getInstance(dependency) {
		if (!IngredientRepository.instance) {
			IngredientRepository.instance = new IngredientRepository(dependency);
		}
		return IngredientRepository.instance;
	}

	private constructor(dependency) {
		IngredientRepository.em = dependency.em;
	}

	async findByName(ingredeintName: string): Promise<Ingredient> {
		return await IngredientRepository.em.getRepository(Ingredient).find({ where: { name: ingredeintName } })[0];
	}
}
