import { EntityManager } from 'typeorm';
import UserIngredient from './entity';

import { AbsUserIngredientRepository } from './type/repository';

export default class UserIngredientRepository implements AbsUserIngredientRepository {
	private static instance: AbsUserIngredientRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbsUserIngredientRepository {
		if (!UserIngredientRepository.instance) {
			UserIngredientRepository.instance = new UserIngredientRepository(dependency);
		}
		return UserIngredientRepository.instance;
	}

	private constructor(dependency) {
		UserIngredientRepository.em = dependency.em;
	}

	async findIngredientByUserId(userId: number): Promise<UserIngredient[]> {
		return await UserIngredientRepository.em.find(UserIngredient, { where: { user: userId }, order: { count: 'DESC' } });
	}
}
