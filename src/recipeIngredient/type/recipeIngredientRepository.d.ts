import { EntityManager } from 'typeorm';

import RecipeIngredient from '../recipeIngredient.entity';

export class AbstractRecipeIngredientRepository {
	private static instance: AbstractRecipeIngredientRepository;
	private static em: EntityManager;

	static getInstance(dependency): AbstractRecipeIngredientRepository;

	private constructor(dependency);

	findAll(): Promise<RecipeIngredient[]>;
}
