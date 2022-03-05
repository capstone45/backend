import { EntityManager } from 'typeorm';

import User from '../user.entity';
import Recipe from '../../recipe/recipe.entity';
import { UpdateUserBody } from './data';

export abstract class AbstractUserRepository {
	private static instance: AbstractUserRepository;
	private static em: EntityManager;

	public static getInstance(dependency): AbstractUserRepository;
	private constructor(dependency);

	updateById(id: number, body: UpdateUserBody): Promise<void>;
	updateThumbnail(id: number, thumbnailUrl: string): Promise<void>;

	deleteThumbnail(id: number): Promise<void>;

	findById(id: number): Promise<User>;
	findByNickname(nickname: string): Promise<User[]>;
	findBeLovedRecipe(id: number): Promise<Recipe[]>;
}
