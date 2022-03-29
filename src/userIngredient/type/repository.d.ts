import { EntityManager } from 'typeorm';
import UserIngredient from '../entity';

export abstract class AbsUserIngredientRepository {
	private static instance: AbsUserIngredientRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsUserIngredientRepository;
	private constructor(dependency);

	findIngredientByUserId(userId: number): Promise<UserIngredient[]>;
}
