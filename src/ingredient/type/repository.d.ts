import { EntityManager } from 'typeorm';

import Ingredient from '../entity';

export class AbstractIngredientRepository {
	private static instance: AbstractIngredientRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractIngredientRepository;
	private constructor(dependency);

	findByName(ingredientName: string): Promise<Ingredient[]>;
}
